var blobs = [];

function Blob(id, x, y, r){
  this.id = id;
  this.x = x;
  this.y = y;
  this.r = r;
}
var express = require('express');
var app = express();
var server = app.listen(3000);

app.use(express.static('public'));
console.log("MY SOCKET SERVER IS RUNNING");

var socket = require('socket.io');

var io = socket(server);

setInterval(heartbeat, 1000);

function heartbeat(){
  io.emit('heartbeat', blobs);
}
io.sockets.on('connection',
//io.sockets.on('connection', newConnection);
  function (socket){
    socket.on('start', function start(data){
      console.log(socket.id + " " + data.x + " " + data.y + " " + data.r);
      //io.sockets.emit('mouse', data);
      var blob = new Blob(socket.id, data.x, data.y, data.r);
      blobs.push(blob);
      //console.log(data);
    });

    socket.on('update', function(data){
      console.log(socket.id + " " + data.x + " " + data.y + " " + data.r);
      //io.sockets.emit('mouse', data);
      var blob;

      for (var i = 0; i < blobs.length; i++) {
          if (socket.id == blobs[i].id){
            blob = blobs[i];
          }
      }

      //blob.x = data.x;
      //blob.y = data.y;
      //blob.r = data.r;

      //blobs.push(blob);
      //console.log(data);
    });
  }
)
