# 📕 Blogging Platform API

## 📖 Overview

This project is a backend server built using **Node.js** and **Express.js**, implementing essential simple CRUD operations using an API.

For more information about the project, you can check the detail on [Blogging Platform API](https://roadmap.sh/projects/blogging-platform-api) or go to [Roadmap.sh](https://roadmap.sh) to get more information about roadmaps, projects, and more.

## 🚀 Running the project

### ✅ Requirements

1. Node.js installed on your machine. If you don't have it installed, you can install it from [here](https://nodejs.org/en/download)

### 📌 Steps

1. Clone the project:

   ```bash
    git clone https://github.com/ramram14/Roadmap.sh-solutions
   ```

2. Navigate to the project's directory:

   ```bash
   cd backend/Node-JS/Blogging-Platform-API
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

5. Access the API:
   Base URL:

```http
http://localhost:3000
```

You can use tools like [Postman](https://www.postman.com/) or any tool you prefer to interact with the API.

### 📌 Notes

- Make sure all commands are executed within the project directory.
- If an error occurs, make sure Node.js is installed correctly.

### 📝 API Documentation

🚀 Base URL:

```bash
http://localhost:3000
```

#### 📌 Endpoints

- **Create a new blog post:**

Request:

```http
POST /api/post
```

Headers:

```bash
{
  "Content-Type": "application/json"
}
```

Body:

```json
{
  "title": "The Art of Slow Living: Finding Peace in a Fast World",
  "content": "In a world that moves at breakneck speed, embracing slow living can be a radical act. Slow living is about intentionality, mindfulness, and savoring the present moment. It’s about simplifying our schedules, reducing distractions, and making time for the things that truly matter. This approach to life can lead to greater fulfillment, deeper relationships, and improved well-being. In this article, we’ll explore the philosophy behind slow living and practical ways to incorporate it into daily life.",
  "category": "Lifestyle",
  "tags": ["mindfulness", "simplicity", "self-care", "well-being"]
}
```

📌 Response:

```json
{
  "success": true,
  "message": "Blog created successfully",
  "data": "Your blog id is [id]"
}
```

🟢 **Status code:** `201 Created`

📌 Error Response:

```json
{
  "success": false,
  "message": "All fields are required: title, content, category, tags"
}
```

or

```json
{
    "success": false,
    "message": "Title must be at least 3 characters",
}
```

🔴 **Status code:** `400 Bad Request`

- **Get all blog posts:**

Request:

```http
GET /api/posts
```

Response:

```json
{
  "success": true,
  "message": "All blogs fetched successfully",
  "data": [
    {
      "_id": "67bcbbad14e78da26712591a",
      "title": "The Art of Slow Living: Finding Peace in a Fast World",
      "content": "In a world that moves at breakneck speed, embracing slow living can be a radical act. Slow living is about intentionality, mindfulness, and savoring the present moment. It’s about simplifying our schedules, reducing distractions, and making time for the things that truly matter. This approach to life can lead to greater fulfillment, deeper relationships, and improved well-being. In this article, we’ll explore the philosophy behind slow living and practical ways to incorporate it into daily life.",
      "category": "Lifestyle",
      "tags": ["mindfulness", "simplicity", "self-care", "well-being"],
      "createdAt": "2025-02-24T18:34:21.227Z",
      "updatedAt": "2025-02-24T18:34:21.227Z"
    }
  ]
}
```

- **Get a specific blog by ID:**

Request:

```http
GET /api/post/:id
```

Response:

```json
{
  "success": true,
  "message": "Blog fetched successfully",
  "data": {
    "_id": "67bcbbad14e78da26712591b",
    "title": "Why Reading Fiction Can Make You a Better Person",
    "content": "Reading fiction is often seen as a pastime, but it offers profound psychological and emotional benefits. Studies have shown that engaging with fictional stories enhances empathy, improves cognitive abilities, and even reduces stress. By immersing ourselves in different narratives, we gain insight into human nature and develop a broader perspective on life. Whether it’s a classic novel or contemporary storytelling, reading fiction can shape our worldview in unexpected ways.",
    "category": "Hobby",
    "tags": ["books", "reading", "fiction", "psychology"],
    "createdAt": "2025-02-24T18:34:21.227Z",
    "updatedAt": "2025-02-24T18:34:21.227Z"
  }
}
```

🟢 **Status code:** `200 Ok`

📌 Error Response:

```json
{
    "success": false,
    "message": "Blog not found"
}
```

🔴 **Status code:** `404 Not Found`

- **Update a blog post:**

Request:

```http
PUT /api/post/:id
```

Headers:

```bash
{
  "Content-Type": "application/json"
}
```

Body:

```json
{
  "title": "new title",
  "content": "new content",
  "category": "new category",
  "tags": ["tag1", "tag2"]
}
```

Response:

```json
{
  "success": true,
  "message": "Blog updated successfully"
}
```

🟢 **Status code:** `200 Ok`

📌 Error Response:

```json
{
    "success": false,
    "message": "Blog not found"
}
```

🔴 **Status code:** `404 Not Found`

```json
{
  "success": false,
  "message": "All fields are required: title, content, category, tags"
}
```

or

```json
{
    "success": false,
    "message": "Title must be at least 3 characters",
}
```

🔴 **Status code:** `400 Bad Request`

- **Delete a blog post:**

Request:

```http
DELETE /api/post/:id
```

Response:

```json
{
  "success": true,
  "message": "Blog deleted successfully"
}
```

🟢 **Status code:** `204 No Content`

📌 Error Response:

```json
{
    "success": false,
    "message": "Blog not found"
}
```

🔴 **Status code:** `404 Not Found`
