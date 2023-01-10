const inquirer = require('inquirer');
const cli = require('cli');


const answer = inquirer.prompt({
    name: "command",
    type: "list",
    choices: [
        "npm run dev", "npm run prod"
    ]
})
answer.then((answer) => {
    cli.exec(answer.command);
})