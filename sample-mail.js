var options = {
    from : 'aaa@gmail.com',
    to   : 'aaa@outlook.com',
    subject : 'test node js sample',
    text : 'Hello'
}

var nodemailer = require('nodemailer');

var mailer = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : 'aaa@gmail.com',
        pass : 'aaa'
    }
});

mailer.sendMail(options , (error,info)=>{
    if(error){
        console.log('error sending email');
        console.log(error.stack);
    }else{
    console.log('Email send ' + info.response)
    }
});


