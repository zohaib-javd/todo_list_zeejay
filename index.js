#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
let todoList = [];
let conditions = true;
const heading = chalk.bold.white.bgBlue(' Welcome To Zeejay\'s - Todo-List App ');
const arrows = chalk.blue.bold('<<<') + chalk.white.bold('===============================') + chalk.blue.bold('>>>');
console.log(chalk.blue.bold(arrows));
console.log(heading);
console.log(chalk.blue.bold(arrows));
let main = async () => {
    while (conditions) {
        let option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option you want to do:",
                choices: ["Add Task", "Delete Task", "Update Task", "View Todo-List", "Exit"],
            }
        ]);
        if (option.choice === "Add Task") {
            await addTask();
        }
        else if (option.choice === "Delete Task") {
            await deleteTask();
        }
        else if (option.choice === "Update Task") {
            await updateTask();
        }
        else if (option.choice === "View Todo-List") {
            await viewTask();
        }
        else if (option.choice === "Exit") {
            conditions = false;
        }
    }
};
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: "Enter your new task:",
            validate: input => input.trim() !== "" ? true : "Task cannot be blank. Please enter a valid task."
        }
    ]);
    todoList.push(newTask.task.trim());
    console.log(`\n${newTask.task} task added successfully to Todo-List.`);
};
let viewTask = () => {
    console.log("\nYour Todo-List:\n");
    todoList.forEach((task, index) => {
        console.log(`${index + 1}: ${task}`);
    });
};
let deleteTask = async () => {
    if (todoList.length === 0) {
        console.log("No tasks to delete.");
        return;
    }
    await viewTask();
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the index no. of the task you want to delete:",
            validate: input => (input > 0 && input <= todoList.length) ? true : `Please enter a valid index between 1 and ${todoList.length}.`
        }
    ]);
    let deletedTask = todoList.splice(taskIndex.index - 1, 1);
    console.log(`\n${deletedTask} this task has been deleted successfully from your Todo-List`);
};
let updateTask = async () => {
    if (todoList.length === 0) {
        console.log("No tasks to update.");
        return;
    }
    await viewTask();
    let Update_task_index = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the index no. of the task you want to update:",
            validate: input => (input > 0 && input <= todoList.length) ? true : `Please enter a valid index between 1 and ${todoList.length}.`
        },
        {
            name: "new_task",
            type: "input",
            message: "Now enter new task name:",
            validate: input => input.trim() !== "" ? true : "Task cannot be blank. Please enter a valid task."
        }
    ]);
    todoList[Update_task_index.index - 1] = Update_task_index.new_task.trim();
    console.log(`\nTask at index no. ${Update_task_index.index} updated successfully [For updated list check option: "View Todo-List"]`);
};
main();
