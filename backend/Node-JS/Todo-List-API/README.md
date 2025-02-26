# 📝 Todo List API

## 📖 Overview

This project is a backend server built using **Node.js** and **Express.js**, implementing essential simple CRUD operations using an API.

For more information about the project, you can check the detail on [Todo List API](https://roadmap.sh/projects/todo-list-api) or go to [Roadmap.sh](https://roadmap.sh) to get more information about roadmaps, projects, and more.

## 🚀 Running the project

### ✅ Requirements

1. Node.js installed on your machine. If you don't have it installed, you can install it from [here](https://nodejs.org/en/download)
2. MongoDB either you have it locally or in the cloud. If you don't have it installed, you can install it from [here](https://www.mongodb.com/try/download/community)

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

4. Create a .env file in the root directory of the project and add the necessary environment variables according to the example in the .env.example file:

5. Run the server:

   ```bash
   npm start

   // or using nodemon for development
   
   npm run dev
   ```

6. Access the API:
   Base URL:

```http
http://localhost:3000
```

You can use tools like [Postman](https://www.postman.com/) or any tool you prefer to interact with the API.

### 📌 Notes

- Make sure all commands are executed within the project directory.
- If an error occurs, make sure Node.js is installed correctly.
- If you are using MongoDB, make sure you have it running and accessible.

<!-- ### 📝 API Documentation

🚀 Base URL:

```bash
http://localhost:3000
```

#### 📌 Endpoints

**Create new user:**

Request:

```http
POST /api/auth.register
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
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123" // Minimum 6 characters
}
```

📌 Response:

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": "Your blog id is [id]"
}
``` -->