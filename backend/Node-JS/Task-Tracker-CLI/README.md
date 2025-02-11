# 📝 Task Tracker CLI Application

## 📖 Overview

Task tracker is a project used to track and manage your tasks. In this task, you will build a simple command line interface (CLI) to track what you need to do, what you have done, and what you are currently working on. This project will help you practice your programming skills, including working with the filesystem, handling user inputs, and building a simple CLI application..

For more information about the project, you can check the detail on [Roadmap.sh project Task Tracker](https://roadmap.sh/projects/task-tracker)

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
   cd backend/Node-JS/Task-Tracker-CLI
   ```

3. Use CLI to run the project

   To get help you can run:

   ```bash
    ./task-cli help
     ```

### 📜 List Commands CLI

1. ➕ Add new task
    Added new task with description:

   ```bash
   ./task-cli add "Watch a movie"
   ```

    output: `Task added successfully (ID: 1)`

2. ✏️ Updating and deleting tasks
    Update a task description or delete it:

   ```bash
   ./task-cli update 1 "Workout"
   ./task-cli delete 1
   ```

3. 🔄 Marking a task as in progress or done
Change the task status to **in-progress** or **done**:

   ```bash
   ./task-cli mark-in-progress 1
   ./task-cli mark-done 1
   ```

4. 📋 Listing all tasks
Showing all tasks:

    ```bash
    ./task-cli list
    ```

5. 🔍 Listing tasks by status
Showing tasks by status:

    ```bash
    ./task-cli list todo
    ./task-cli list in-progress
    ./task-cli list done
    ```

### 📌 Notes

* Make sure all commands are executed within the project directory.
* If an error occurs, make sure Node.js is installed correctly.
* For further help, use the ./task-cli help command.
