/* eslint-disable no-console */
const logger = require('winston');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port, ()=>{
	console.log(`Feathers application started on ${app.get('host')}:${port}`);
});

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);


const io = app.io;

io.on('connection', (socket)=>{
	console.log("New connection ", socket.id);

	socket.on('newMessage', (message)=>{
		io.sockets.emit('newMessage', message);
		console.log(message);
	});
});