// Commands to run
module.exports = commands = [
    {command:'md' , args:['dd'], descr:'md' },
    {command: 'cmd' , args:['/c', 'cls'] , descr:'cls'},
    {command:'help' , args:['md'], descr:'help' },
    {command:'echo' , args:['hello from cli-sample program'], descr:'echo' },
    {command: 'find' , args:['/c','"June"', 'D:\\June.txt'] , descr:'find'},
    {command: 'cmd' , args:['/c', 'dir'] , descr:'dir'},
    {command: 'cmd' , args:['/c', 'dir','*.json'], descr:'dir json files' },
    {command:'ver' , args:[], descr:'version' },
    {command:'vol' , args:['d:'], descr:'volume' },
    {command:'help' , args:['date'], descr:'date' },
    //{command:'rd' , args:['dd'], descr:'remove dir' },
    ];