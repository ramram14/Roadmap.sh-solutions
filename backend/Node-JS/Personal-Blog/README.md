# 📕 Personal Blog

## 📖 Overview

This project builds a simple Personal Blog using Node.js and Express.js.

### Project Focused

This project is a backend server built using **Node.js** and **Express.js**, implementing essential features such as CRUD operations and basic authentication.

* **CRUD Operations** – Supports Create, Read, Update, and Delete functionalities.
* **Authentication** – Implements a simple authentication mechanism using cookies (currently, user and admin data are hardcoded).
* **Templating with EJS** – Uses EJS (Embedded JavaScript) to dynamically generate HTML on the server side.
* **Minimal Styling** – While styling is not the primary focus, basic CSS has been included for foundational design elements.

For more information about the project, you can check the detail on [Personal Blog](https://roadmap.sh/projects/personal-blog) or go to [Roadmap.sh](https://roadmap.sh) to get more information about roadmaps, projects, and more.

## 🚀 Running the project

### ✅ Requirements

1. Node.js installed on your machine. If you don't have it installed, you can installed it from [here](https://nodejs.org/en/download)

### 📌 Steps

1. Clone the project:

   ```bash
    git clone https://github.com/ramram14/Roadmap.sh-solutions
    ```

2. Navigate to the project's directory:

   ```bash
   cd backend/Node-JS/Personal-Blog
   ```

3. Install dependencies:

   ```bash
    npm install
    ```

4. Run the server:

   ```bash
   npm start

   // or using nodemon for development
   
   npm run dev
   ```

5. Open your browser and visit `http://localhost:3000` to access the app.

### 📌 Notes

* Make sure all commands are executed within the project directory.
* If an error occurs, make sure Node.js is installed correctly.

### 📌 Routes Overview

#### Public Routes

1. Home Page:
   * URL: `/` and `/home`
   * Method: `GET`
   * Description: Displays the home page with a brief description of the project.

2. Articles Page:
   * URL: `/articles/:slug`
   * Method: `GET`
   * Description: Displays a specific article based on its slug.

3. Admin Login Page:
   * URL: `/login`
   * Method: `GET`
   * Description: Displays the admin login page for authentication.

4. Admin Login:
   * URL: `/login`
   * Method: `POST`
   * Description: Authenticates the admin user, create cookies, and redirects to the home page.
  
### Admin Routes

If user try to access admin routes without being logged in, they will be redirected to the login page.

1. Create Blog Page:
   * URL: `/new`
   * Method: `GET`
   * Description: Displays the page to create a new blog post.

2. Create Blog Post:
   * URL: `/new`
   * Method: `POST`
   * Description: Processes form submission and creates a new blog post.
  
3. Edit Blog Page:
   * URL: `/edit/:slug`
   * Method: `GET`
   * Description: Displays the page to edit an existing blog post.

4. Edit Blog Post:
   * URL: `/edit/:slug`
   * Method: `PUT`
   * Description: Updates an existing blog post using form submission with method override.

5. Delete Blog Post:
   * URL: `/delete/:slug`
   * Method: `DELETE`
   * Description: Deletes a blog post using form submission with method override.
