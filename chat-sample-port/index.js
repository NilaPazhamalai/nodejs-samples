var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var renderChatApp = (request,response)=>{
    response.sendFile(__dirname+"/view/"+"chat.html");
}
app.get('/',renderChatApp);


var numUsers = 0;
var connectedUsers = {};
io.on('connection',(socket)=>{
    var addedUser = false;
    console.log("connection established" + socket);
    socket.on('add_user', function(userName){
       connectedUsers[userName] = socket;
        console.log("add user");
        socket.userName = userName;
        numUsers++;
        socket.broadcast.emit('user_joined',{
            username: socket.userName,
            numUsers: numUsers
          });
          socket.emit('server_msg', "ADMIN SERVER: hello "+socket.userName);
          socket.emit('server_msg', "ADMIN SERVER: No of users in converstion "+numUsers);
        addedUser = true;
    });

    
    socket.on('client_msg', function(msg){
        io.emit('server_msg', socket.userName +" : "+msg);
    });

  socket.on('disconnect', function () {
    if (addedUser) {
      --numUsers;

      socket.broadcast.emit('user_left', {
        username: socket.userName,
        numUsers: numUsers
      });
    }
  });
});
  
http.listen(8081,()=>console.log("listening at port 8081"));