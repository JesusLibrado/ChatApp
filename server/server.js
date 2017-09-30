const app = require('express')();

const server = app.listen(3030, ()=>{
	console.log('Connected to server');
});

const io = require('socket.io')(server);

io.on('connection', (socket)=>{

	console.log('New connection ', socket.id);

	socket.on('newMessage', function(message){
      io.sockets.emit('newMessage', message);
      console.log(message);
    });
});