// File Open, Close and statistics
var fs = require('fs');

var filePathToOpen = "C:\\Users\\vennilap\\Documents\\NodeJs\\input.txt";
var filePathToWrite = "C:\\Users\\vennilap\\Documents\\NodeJs\\output.txt";
var buffer = Buffer.alloc(1024);

var printSuccessMsg = (operation)=>{
    console.log("------------------------------------");
    console.log("File %s successfully done" , operation);
    console.log("------------------------------------");
}

var showReadContent = (error, bytes) => {
    if (error) {
        return console.log("Error occured in file read. PATH: " + filePathToOpen);
    }
    printSuccessMsg("READ");
    console.log(bytes + '  bytes read');
    console.log("file content read : bytes has junk");
    console.log(buffer.toString());
    console.log("file content read : buffer without junk - sliced to size of bytes");
    if (bytes > 0) {
        console.log(buffer.slice(0, bytes.length).toString());
    }

   
}

var onFileClose = (error) => {
    if (error) {
        return console.log("Error occured in file close. PATH: " + filePathToOpen);
    }
    printSuccessMsg("CLOSE");
}

var afterFileTruncate =(error)=>{
    if (error) {
        return console.log("Error occured in file truncate. PATH: " + filePathToOpen);
    }
    printSuccessMsg("TRUNCATE");
}

var afterFileOpen = (error, fd) => {
    if (error) {
        return console.log("Error occured in file open. PATH: " + filePathToOpen);
    }
    printSuccessMsg("OPEN");
    console.log("File Opened. PATH: " + filePathToOpen);
    console.log("File Descriptor. : " + fd.toString());
    console.log("File Truncate  Start");
    fs.ftruncate(fd, 10 , afterFileTruncate);
    console.log("File Read Start");
    fs.read(fd, buffer, 0, buffer.length, 0, showReadContent);
    console.log("file close trigger");
    fs.close(fd, onFileClose);

}
fs.open(filePathToOpen, 'r+', afterFileOpen);




var callAfterFileStat = (error, stat) => {
    if (error) {
        console.log("Error occured in file stat. PATH: " + filePathToOpen);
        return console.error(error);
    }
    printSuccessMsg("INFO RETRIEVAL");
    console.log("REceived file info successfully");
    for (const key in stat) {
        if (stat.hasOwnProperty(key)) {
            const element = stat[key];
            console.log(key + " : " + element);
        }
    }
    console.log("------------------------------------");

}
fs.stat(filePathToOpen, callAfterFileStat);



var afterWriteDone = (error)=>{
    if (error) {
        return console.log("Error occured in file write. PATH: " + filePathToWrite);
    }
    printSuccessMsg("WRITE");

}
var startWriteAfterFileOpen = (error, fd)=>{
    if (error) {
        console.log("Error occured in file open. PATH: " + filePathToWrite);
        return console.error(error);
    }

    fs.write(fd,buffer, afterWriteDone);
}
fs.open(filePathToWrite,'w+', startWriteAfterFileOpen);