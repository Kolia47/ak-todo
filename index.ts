#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let todoList:string[] = [];
let condition = true;

console.log(chalk.bold.yellow("\n\t Welcome To ToDo List \n\t"));

let main = async () => {
    while (condition) {
        let option = await inquirer.prompt([
            {
                name: "option",
                type: "list",
                message: "What would you like to do?",
                choices: ["Add Task","View Task","Delete Task","Update Task","Exit"]
            }
        ])
        if (option.option === "Add Task") {
            await addTask()
        }
        else if (option.option === "View Task") {
            await viewTask()
        }
        else if (option.option === "Delete Task") {
            await deleteTask()
        }
        else if (option.option === "Update Task") {
            await updateTask()
        }
        else if (option.option === "Exit") {
            condition = false
        }
    }
}
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: "Enter your new task : "
        }
    ])
    todoList.push(newTask.task)
    console.log(`\n ${newTask.task} task added successfully in your ToDo-List`)
}

let viewTask = () => {
    console.log("\n Your ToDo-List: \n");
    todoList.forEach((task, index) => {
        console.log(`${index+1}: ${task}`);
    })   
}

let deleteTask = async () => {
    await viewTask()
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "what you want to delete",
        }
    ])
    let deletedTask = todoList.splice(taskIndex.index-1, 1);
    console.log(`\n ${deletedTask} has been deleted \n`);
}

let updateTask = async () => {
    await viewTask()
    let update_Task = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "what you want to update",
        },
        {
            name: "newTask",
            type: "input",
            message: "Enter your new task : "
        }
    ])
    todoList[update_Task.index-1] = update_Task.newTask;
    console.log(`\n Task at index no. ${update_Task.index-1} updated successfully`);
}

main()

