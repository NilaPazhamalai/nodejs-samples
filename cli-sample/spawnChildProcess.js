const chalk = require('chalk'),
    spawn = require('child_process').spawn;

module.exports = spawnChildProcess = (command)=>{
    const cmd = spawn(command.command,command.args,{
        shell: true
      });
   
    cmd.stdout.on('data', (data) => {
        console.log(chalk.green.bold.underline(`stdout of command [${command.descr}] : `));
        console.log(`${data}`);
    });

    cmd.on('error', (data) => {
        console.log(chalk.red.bold.underline(`stderr of command [${command.descr}] : `));
        console.log(`${data}`);
    });

    cmd.on('exit', (data) => {
        console.log(chalk.yellow.bold.underline(`exit of command [${command.descr}] : `));
        console.log(`${data}`);
    });

    cmd.on('close', (code) => {
        //console.log(`child process  [${command.descr}]  exited with code ${code}`);
    });
    cmd.on('uncaughtException', (err) => {
        console.log(`Caught exception: ${err}\n`);
      });
}
