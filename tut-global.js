

/*
Global objects
*/

console.log(__filename);
console.log(__dirname);


var delayFn = ()=>{
    console.log("Hello after 2 seconds");
}
console.log('call delayFn');
var t =setTimeout(delayFn,2000);
/*
clearTimeout(t);
console.log('call delayFn');
var t = clearTimeout(delayFn,2000);
*/


