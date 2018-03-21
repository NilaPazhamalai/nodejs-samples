var fs = require('fs');


var readPromise = (resolve,reject)=>{
    var input = "./input.txt"; // operation
    fs.readFile(input,
    (err,data)=>{
        if(err){
            reject(err);
        }else{
            console.log('in simple async success ');
            resolve(data.toString());
        }
    });
}
var readAsync=()=>{
    return new Promise(readPromise);
}


var main= ()=>{
    var readPromise = readAsync();
    readPromise.then( 
        (result)=>{
            console.log('success' + result);
        },
        (err)=>{
            console.log('error in Promise :  ' + err);
        }
    ).catch( (reject)=>{
        console.log("exception: " + reject);  // change result to valu in line 25 to check exceptions in promise
    }

    );
}

console.log('check simple async');
main();
console.log('end check simple async');


