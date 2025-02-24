const express = require('express');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const slugify = require('slugify')

// Middleware
const { checkAuth } = require('./checkAuthMiddleware');

const app = express();


const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));

// Middleware ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Lib
const dbPath = path.join(__dirname, 'db.json');

/**
 * 
 * @param {string} title 
 * @param {JSON} database 
 * @returns {string}
 */
const generateSlug = (title, database) => {
    let slug = slugify(title, { lower: true });
    let counter = 1;
    let uniqueSlug = slug;

    while (database.some(blog => blog.slug === uniqueSlug)) {
        uniqueSlug = `${slug}-${counter}`;
        counter++;
    }

    return uniqueSlug;
}


// Redirect to the home page
app.get('/', (req, res) => {
    res.redirect('/home');
});

// This route renders the home page with all blog posts.
app.get('/home', (req, res) => {
    try {
        const blogs = fs.readFileSync(path.join(dbPath), 'utf8');
        const blogsParsed = JSON.parse(blogs);
        for (let blog of blogsParsed) {
            blog.createdAt = moment(blog.createdAt).format('MMMM Do YYYY');
            blog.updatedAt = moment(blog.updatedAt).format('MMMM Do YYYY');
        }
        res.render('allBlogs', { blogs: blogsParsed });
    } catch (error) {
        res.send('Error reading file');
    }
});

// This route renders the blog detail page for a specific blog post.
app.get('/article/:slug', (req, res) => {
    try {
        const { slug } = req.params;
        const blogs = fs.readFileSync(path.join(dbPath), 'utf8');
        const blogsParsed = JSON.parse(blogs);
        const blog = blogsParsed.find(blog => blog.slug === slug);
        blog.createdAt = moment(blog.createdAt).format('MMMM Do YYYY');
        blog.updatedAt = moment(blog.updatedAt).format('MMMM Do YYYY');
        res.render('blogDetail', { blog });
    } catch (error) {
        res.send('Error reading file');
    }
});


/**
 * Admin Routes
 * 
 * GET Routes:
 * - /login: Render the login page for admin authentication.
 * - /new: Render the page for creating a new blog post.
 * - /edit/:slug: Render the page for editing a blog post identified by its slug.
 * 
 * POST Routes:
 * - /login: Handle the login form submission for admin authentication.
 * - /new: Handle the form submission for creating a new blog post.
 * 
 * PUT Routes:
 * - /edit/:slug: Handle updating a blog post identified by its slug.
 * 
 * DELETE Routes:
 * - /delete/:slug: Handle the deletion of a blog post identified by its slug.
 */

// Render the login page for admin authentication.
app.get('/login', (req, res) => {
    res.render('adminLogin');
});

// Handle the login form submission for admin authentication.
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Currently, we hardcode the username and password
    // In a real application, you would validate the credentials against a database
    if (username === 'admin' && password === '123456') {

        // Set a cookie to indicate that the user is logged in
        res.cookie('loggedIn', true);
        res.redirect('/home');
    } else {
        res.send('Invalid username or password');
    }
});

// Render the page for creating a new blog post.
app.get('/new', checkAuth, (req, res) => {
    res.render('createBlog');
});

// Handle the form submission for creating a new blog post.
app.post('/new', checkAuth, (req, res) => {
    try {
        const blogs = fs.readFileSync(path.join(dbPath), 'utf8');
        const parsedBlogs = JSON.parse(blogs);

        const { title, content } = req.body;

        // Generate a slug
        const slug = generateSlug(title, parsedBlogs);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const newBlog = {
            title,
            content,
            slug,
            createdAt,
            updatedAt
        };

        parsedBlogs.push(newBlog);
        fs.writeFileSync(path.join(dbPath), JSON.stringify(parsedBlogs));
        res.redirect('/home');
        res.send('Blog created successfully');
    } catch (error) {
        res.send('Error reading file');
    }
})

// Handle updating a blog post identified by its slug.
app.get('/edit/:slug', checkAuth, (req, res) => {
    const { slug } = req.params;
    try {
        const blogs = fs.readFileSync(path.join(dbPath), 'utf8');
        const blogsParsed = JSON.parse(blogs);
        const blog = blogsParsed.find(blog => blog.slug === slug);

        if (!blog) {
            res.send('Blog not found');
            return;
        }
        res.render('editBlog', { blog });
    } catch (error) {
        res.send('Error reading file');
    }
});

// Handle updating a blog post identified by its slug.
app.put('/edit/:slug', checkAuth, (req, res) => {
    try {
        const { slug } = req.params
        const { title, content } = req.body

        const blogs = fs.readFileSync(path.join(dbPath), 'utf8');
        const blogsParsed = JSON.parse(blogs);
        const index = blogsParsed.findIndex((blog) => blog.slug === slug)
        if (index === -1) {
            res.send('Blog not found')
        }

        // Generate a new slug if the title has changed
        let newSlug;
        if (title !== blogs[index].title) {
            newSlug = slugify(title, { lower: true })
        }

        // Update the blog
        const newBlog = {
            ...blogs[index],
            title,
            content,
            slug: newSlug || blog.slug,
            updatedAt: new Date().toISOString()
        }
        const newBlogs = JSON.parse(blogs)
        newBlogs[index] = newBlog

        // Write the updated blogs back to the file
        fs.writeFileSync(path.join(dbPath), JSON.stringify(newBlogs))
        res.redirect(`/article/${newBlog.slug}`)
    } catch (error) {
        res.send('Failed')
    }
})

// Handle the deletion of a blog post identified by its slug.
app.delete('/delete/:slug', checkAuth, (req, res) => {
    try {
        const { slug } = req.params
        const blogs = fs.readFileSync(path.join(dbPath), 'utf8');
        const blogsParsed = JSON.parse(blogs);

        // Find the index of the blog with the given slug
        const index = blogsParsed.findIndex((blog) => blog.slug === slug)
        if (index === -1) {
            res.send('Blog not found')
        }

        // Remove the blog from the array
        blogsParsed.splice(index, 1)
        fs.writeFileSync(path.join(dbPath), JSON.stringify(blogsParsed))
        res.redirect('/home')
    } catch (error) {
        res.send('Failed')
    }
})


// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});