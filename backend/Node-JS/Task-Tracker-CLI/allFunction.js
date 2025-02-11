/**
 * @module TaskTrackerCLI
 * Main module for the Task Tracker CLI.
 *
 * @description
 * This module serves as the entry point for the Task Tracker command-line utility,
 * enabling users to manage their tasks directly from the terminal. It supports operations
 * such as adding, updating, deleting, and listing tasks, as well as changing task statuses.
 *
 * Tasks are persisted in a JSON file ("tasks.json"), which is automatically created and initialized
 * if it does not exist. The module handles file I/O operations, ensuring that tasks are reliably
 * stored and updated.
 *
 * @summary
 * - save data in "tasks.json".
 * - Supports CRUD operations and status tasks.
 * - Uses JSON as a simple data store.
 *
 * @function
 * Core functionality provided:
 *   - runTaskManager(input): Parses user input commands and routes them to the appropriate handler.
 *   - getAllTasks(): Retrieves the list of tasks from the file database, initializing the file if needed.
 *   - addTask(tasks, taskDescription): Adds a new task with an auto-incremented ID and default status "todo".
 *   - updateTask(tasks, id, newDescription): Updates an existing task's description and updated timestamp.
 *   - deleteTask(tasks, id): Removes a task by its ID.
 *   - updateTaskStatus(tasks, id, newStatus): Sets a task's status to "todo", "in-progress", or "done".
 *   - getTaskByStatus(tasks, status): Filters and displays tasks matching a specific status.
 *   - saveTask(tasks): Writes the current task list back to the JSON file.
 *   - getTime(): Generates a current timestamp in ISO format.
 *   - isValidStatus(status): Validates if a provided task status is acceptable.
 *
 * @example
 * Usage example:
 *   import runTaskManager from './allFunction.js';
 *   runTaskManager(process.argv.slice(2));
 *
 * 
 */



import fs from 'fs';


// file database route
const FILE_DATABASE_ROUTE = "./tasks.json";


/**
* @description This is main function for run task manager
* @param {Array<string>} input - input from user
*/

export default function runTaskManager(input) {



    // Action of what user want to do
    const action = input[0].toLowerCase();

    // taskIdentifier dan contains id of task or description for add task
    const taskIdentifier = input[1];

    // User who want to edit their task need id in second argument
    const taskId = isNaN(Number(taskIdentifier)) ? null : Number(taskIdentifier);

    /**
        * This is for update task
        * Can be new description or new status
        */
    const updateData = input[2];

    // Get all task
    const tasks = getAllTasks();



    // All if statement for action
    switch (action) {
        case "add":
            return addTask(tasks, taskIdentifier);

        case "update":
            return updateTask(tasks, taskId, updateData);

        case "delete":
            return deleteTask(tasks, taskId);

        case "mark-in-progress":
            return updateTaskStatus(tasks, taskId, "in-progress");

        case "mark-done":
            return updateTaskStatus(tasks, taskId, "done");

        case "list":
            if (taskIdentifier) {
                return getTaskByStatus(tasks, taskIdentifier);
            } else {
                return console.log(tasks);
            }
        case "help":
            const helpMessage = `
Task Manager CLI - Help Instructions

Commands:
1. Add a new task:
    ./task-cli add "Your task description"

2. Update existing task:
    ./task-cli update <task-id> "New task description"

3. Delete a task:
    ./task-cli delete <task-id>

4. Mark task as in progress:
    ./task-cli mark-in-progress <task-id>

5. Mark task as done:
    ./task-cli mark-done <task-id>

6. List all tasks:
    ./task-cli list

7. List tasks by status:
    ./task-cli list <status>
    Available statuses: todo, in-progress, done

Examples:
./task-cli add "Complete project documentation"
./task-cli update 1 "Update project documentation"
./task-cli list todo
`;
            console.log(helpMessage);
            break;

        default:
            console.log("Invalid command. Use './task-cli help' to see available commands.");
    }

}

// Get all tasks
function getAllTasks() {
    try {
        // If file not exist, create new file with empty array
        if (!fs.existsSync(FILE_DATABASE_ROUTE)) {
            fs.writeFileSync(FILE_DATABASE_ROUTE, "[]"); // Buat file jika tidak ada
        }

        const data = fs.readFileSync(FILE_DATABASE_ROUTE, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        console.log("Error reading task file:", err);
        process.exit(1);
    }
}

// Get task by status
function getTaskByStatus(tasks, status) {
    if (!isValidStatus(status)) {
        return console.log("Invalid status, please use todo, in-progress, or done");
    }
    console.log("Tasks by status:", status);
    const filteredTasks = tasks.filter((task) => task.status === status);
    console.log(filteredTasks);
}

// Save task to file database
function saveTask(tasks) {
    try {
        fs.writeFileSync(FILE_DATABASE_ROUTE, JSON.stringify(tasks, null, 2));
    } catch (err) {
        console.log("Error writing task file:", err);
        process.exit(1);
    }
}

// Add new task
function addTask(tasks, taskDescription) {
    if (!taskDescription) {
        return console.log("Please provide a task description");
    }

    // Generate new id auto increment
    const newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
    const newTask = {
        id: newId,
        description: taskDescription,
        status: "todo",
        createdAt: getTime(),
        updatedAt: getTime(),
    };


    tasks.push(newTask);
    saveTask(tasks);
    console.log(`Task added successfully (ID: ${newId})`);
    console.log(newTask);
}

// Update task
function updateTask(tasks, id, taskIdentifier) {
    if (!id || !taskIdentifier) {
        return console.log("Please provide both task ID and updated task description")
    }

    const index = tasks.findIndex((task) => task.id === id);

    if (index === -1) {
        console.log("Task not found")
        process.exit(1);
    }

    tasks[index].description = taskIdentifier;
    tasks[index].updatedAt = getTime();
    saveTask(tasks);
    console.log(tasks[index]);
}

// Delete task
function deleteTask(tasks, id) {
    if (!id || isNaN(id)) {
        return console.log("Please provide a task ID")
    }

    const index = tasks.findIndex((task) => task.id === id);

    if (index === -1) {
        return console.log("Task ID not found")
    }

    tasks.splice(index, 1);
    saveTask(tasks);
    console.log("Task deleted successfully")
}

// Update task status
function updateTaskStatus(tasks, id, newStatus) {
    if (!isValidStatus(newStatus)) {
        return console.log("Invalid status, please use todo, in-progress, or done")
    }
    const index = tasks.findIndex((task) => task.id === id);

    if (index === -1) {
        return console.log("Task ID not found")
    }

    tasks[index].status = newStatus;
    tasks[index].updatedAt = getTime();
    saveTask(tasks);
    console.log(tasks[index]);
}

// Get current time
function getTime() {
    return new Date().toISOString();

}

function isValidStatus(status) {
    return ["todo", "in-progress", "done"].includes(status);
}