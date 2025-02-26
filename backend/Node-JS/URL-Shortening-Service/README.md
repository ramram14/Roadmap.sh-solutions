# 🔗 Todo List API

## 📖 Overview

This project is a backend server built using **Node.js** and **Express.js**, implementing essential **simple CRUD operations** using an API.

For more information about the project, you can check the detail on [URL Shortening Service](https://roadmap.sh/projects/url-shortening-service) or go to [Roadmap.sh](https://roadmap.sh) to get more information about roadmaps, projects, and more.

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

### 📝 API Documentation

```bash
http://localhost:3000
```

#### 📌 Endpoints

#### Create a new shorten link

Request:

```http
POST /api/shorten
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
    "url": "https://www.example.com/long-url"
}
```

📌 Response:

```json
{
    "statusCode": 201,
    "success": true,
    "message": "Url created successfully",
    "data": {
        "url": "https://www.example.com/long-url",
        "shortCode": "p4BP1W", // short code generated randomly for the url
        "accessCount": 0,
        "_id": "67bf99b7ed22ee34caf8a11c",
        "createdAt": "2025-02-26T22:46:15.063Z",
        "updatedAt": "2025-02-26T22:46:15.063Z",
        "__v": 0
    }
}
```

🟢 **Status code:** `201 Created`

#### Get original url

Request:

```http
GET /api/shorten/:shortCode
```

📌 Response:

```json
{
    "statusCode": 200,
    "success": true,
    "message": "Url found successfully",
    "data": {
        "_id": "67bf99b7ed22ee34caf8a11c",
        "url": "https://www.example.com/long-url",
        "shortCode": "p4BP1W",
        "createdAt": "2025-02-26T22:46:15.063Z",
        "updatedAt": "2025-02-26T22:48:45.414Z",
        "__v": 0
    }
}
```

🟢 **Status code:** `200 Ok`

#### Update original url

Request:

```http
PUT /api/shorten/:shortCode
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
    "url": "https://www.example.com/udpated-url"
}
```

📌 Response:

```json
{
    "statusCode": 200,
    "success": true,
    "message": "Url updated successfully",
    "data": {
        "_id": "67bf99b7ed22ee34caf8a11c",
        "url": "https://www.example.com/udpated-url",
        "shortCode": "p4BP1W",
        "createdAt": "2025-02-26T22:46:15.063Z",
        "updatedAt": "2025-02-26T22:50:05.277Z",
        "__v": 0
    }
}
```

🟢 **Status code:** `200 Ok`

#### Delete url

Request:

```http
DELETE /api/shorten/:shortCode
```

📌 Response:

```json
{
    "statusCode": 204,
    "success": true,
    "message": "Url deleted successfully"
}
```
