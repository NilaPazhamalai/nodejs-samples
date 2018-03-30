var app = require('./app');
var portNo = process.env.portNo || 3000;
app.listen(portNo, ()=>{
    console.log('server listening at port '+ portNo)
});