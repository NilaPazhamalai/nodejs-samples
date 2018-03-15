/* 
Buffer - examples from node js doc
*/

// allocate memory to a new buffer
console.log('------------------');
console.log('allocate memory to a new buffer');
const buf = Buffer.alloc(5);
console.log(buf);
console.log(buf.toString());
console.log(buf.toJSON());

// allocate memory to a new buffer and fill
console.log('------------------');
console.log('allocate memory to a new buffer and fill');
const buf1 = Buffer.alloc(5, 'd');
console.log(buf1);
console.log(buf1.toString());
console.log(buf1.toString('hex'));
console.log(buf1.toJSON());
console.log('Buffer byte length: ' +Buffer.byteLength(buf1));
console.log('Buffer string byte length: ' +Buffer.byteLength(buf1.toString()));

console.log('------------------------------');
console.log('create buffer from array');
var arrBuf = Buffer.from(['g','a','d']);
console.log(arrBuf.toString());

console.log('------------------------------');
console.log('create buffer from string');
var strBuf = Buffer.from("Easy learning");
console.log(strBuf.toString());


console.log('------------------------------');
console.log('writing buffer from string');
strBuf.write("TExt ovewritten ??");
console.log(strBuf.toString());


console.log('------------------------------');
console.log('concat buffer');
strBuf.write("TExt ovewritten ??");
var concatBuf = Buffer.concat([arrBuf,strBuf]);
console.log(concatBuf.toString());


console.log('------------------------------');
console.log('slice buffer');
console.log(concatBuf.slice(2,5).toString('ascii'))
//
console.log('------------------------------');
console.log('byte length');
const str = '\u00bd + \u00bc = \u00be';

// Prints: ½ + ¼ = ¾: 9 characters, 12 bytes
console.log(`${str}: ${str.length} characters, ` +
            `${Buffer.byteLength(str, 'utf8')} bytes`);


// Buffer compare - class method
// like a compartor in java -to pass into sort method in collection
const b1 = Buffer.from('789');
const b2 = Buffer.from('987');
const b3 = Buffer.from('454');
const arr = [b1,b2,b3];
console.log('before sort : ' + arr);
arr.sort(Buffer.compare);
console.log('after sort : ' + arr);
// to sort in descending ?? - Question 



//