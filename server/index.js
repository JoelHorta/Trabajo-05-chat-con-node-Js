var express = require('express');
var  app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var mensajes = [{
    id: 1,
    text: "Hola soy un mensaje",
    author: "Joel Horta"
}];

app.use(express.static('public'))

app.get('/', function(req, res) {
  res.status(200).send("Hi world");
});

io.on('connection', function(socket) {
  console.log('Alguien se ha conectado con Socket');
  socket.emit('mensajes', mensajes);

  socket.on('nuevo_mensaje', function(data) {
    mensajes.push(data);

    io.sockets.emit('mensajes', mensajes);
  });
});

server.listen(1000, function() {
  console.log("esta corriendo en http://localhost:1000");
});
