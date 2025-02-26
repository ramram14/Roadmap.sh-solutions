/**
const Todo = require('../models/todo');



const todos = [
    {
        title: "Learn Node.js",
        description: "Learn Node.js and build a REST API",
        user: "67be5a83ab26a68daecca70d",
    },
    {
        title: "Learn React",
        description: "Learn React and build a Todo List App",
        user: "67be5a83ab26a68daecca70d",
    },
    {
        title: "Learn MongoDB",
        description: "Learn MongoDB and build a Todo List App",
        user: "67be5a83ab26a68daecca70d",
    },
    {
        title: "Learn Express",
        description: "Learn Express and create server-side logic",
        user: "67be5a83ab26a68daecca70d",
    },
    {
        title: "Learn Angular",
        description: "Learn Angular and create a dynamic web app",
        user: "67be5a83ab26a68daecca70d",
    },
    {
        title: "Learn Vue.js",
        description: "Learn Vue.js and implement a single-page application",
        user: "67be5a83ab26a68daecca70d",
    },
    {
        title: "Learn TypeScript",
        description: "Learn TypeScript to add types to your JavaScript",
        user: "67be5a83ab26a68daecca70d",
    },
    {
        title: "Learn GraphQL",
        description: "Learn GraphQL to query APIs with more flexibility",
        user: "67be5a83ab26a68daecca70d",
    },
    {
        title: "Learn Docker",
        description: "Learn Docker for containerizing applications",
        user: "67be5a83ab26a68daecca70d",
    },
    {
        title: "Learn AWS",
        description: "Learn AWS to deploy and manage applications on the cloud",
        user: "67be5a83ab26a68daecca70d",
    }
]

module.exports.seedTodos = async () => {
    await Todo.deleteMany();
    await Todo.insertMany(todos);
    console.log("Seeds created successfully");
    process.exit();
}
*/