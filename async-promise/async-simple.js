
var async = require('async');


// The Callback
function callback(err, data) {
    if(err) {
      console.log(err);
      return;
    }
    console.log(data);
  }
  
async.parallel({
    one: ()=>{
        console.log('fn one test');
        setTimeout(() => {
            callback(null, 1);
        }, 200);
        
    },

    two: ()=>{
        console.log('fn two test');
        setTimeout(() => {
            callback(new Error("error from async"),''); 
        }, 100);
    },
    function(error,result){
        if(error){
            console.log('error');
            console.log(error);
        }
        console.log(result);
    }
});



