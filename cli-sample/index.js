#!/usr/bin/env node
'use strict';
const program = require('commander'),
    chalk = require("chalk"),
    pkg = require('./package.json'),
    spawn = require('child_process').spawn,
    {prompt} = require('inquirer'),
    commands = require('./winCommands'),
    questions = require('./questions');

var spawnChildProcess = require('./spawnChildProcess');

var startChildProcess = (no) => {
    var number = no.no_of_commands;
    for (let index = 0; index < number; index++) {
        spawnChildProcess(commands[index]);
    }
}

program
    .version(pkg.version)
    .command('win')
    .alias('w')
    .description('Windows shell commands CLI app')
    .action(() => {
        prompt(questions).then(answers =>
            startChildProcess(answers));
    });
program.parse(process.argv);
if (program.args.length === 0) program.help();


