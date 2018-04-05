var cli = require('commander');
var {prompt} = require('inquirer');

var spawn = require('child_process').spawn;
var chalk = require("chalk");

var cmd = 'echo hi';
var cwd = 'C:/Users/vennilap/Downloads';
var questions = [
    {
        type: 'input',
        name: 'cmd',
        message: 'enter the command to run'
    }
];


cli
.version('1.0.0')
.command('assess')
.alias('a') 
.action(()=>{
    prompt(questions).then((answer)=>{
        var process = spawn(answer.cmd,[],{shell:true});
        process.stdout.on('data',(data)=>{
            console.log(chalk.green.bold.underline('success data'));
            console.log(data.toString());
        });
        process.on('error',(data)=>{
            console.log(chalk.red.bold.underline('error data'));
            console.log(data);
        });
        process.on('exit',(data,signal)=>{
            console.log(chalk.yellow.bold.underline('exit data'));
            console.log(data);
            console.log(chalk.yellow.bold.underline('exit signal'));
            console.log(signal);
        });
    }
)}
);

cli.parse(process.argv);
if (cli.args.length === 0) cli.help();



