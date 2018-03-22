var exp = require('./async-export');


console.log("call export sync");
var data = exp.exportToExcelSync('data to export', 'c://temp');
console.log("out" + data);
console.log("end export sync");




var onExportDone = (err,data)=>{
    if(err){
        console.log(err + "  in impl fn");
    }else{
        console.log(data + "  in impl fn");
    }
}
console.log("call export async");
exp.exportToExcel('It is the data','C:/temp/doc',onExportDone);

console.log("end export async");



