// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/ZjVyKXp9hec

// Based off of Shawn Van Every's Live Web
// http://itp.nyu.edu/~sve204/liveweb_fall2013/week3.html

var splitblobs = [];
var trees = [];
var rocks = [];
var millitimer = 60;
var timeTilInvasion = 60;
function Blob(id, x, y, r) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.r = r;
  this.rotation = 0;
}
function Tree(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;

}
function Rock(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
}

// Using express: http://expressjs.com/
var express = require('express');
// Create the app
var app = express();

// Set up the server
// process.env.PORT is related to deploying on heroku
var server = app.listen(process.env.PORT || 3000, listen);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
  for (var i = 0; i < 5; i++){
      var x = Math.floor((Math.random() * 2000) + 1) - 1000;
      var y = Math.floor((Math.random() * 2000) + 1) - 1000;
      rocks[i] = new Rock(x, y, 128);
  }
  for (var i = 0; i < 5; i++){
      var x = Math.floor((Math.random() * 2000) + 1) - 1000;
      var y = Math.floor((Math.random() * 2000) + 1) - 1000;
      trees[i] = new Tree(x, y, 128);
  }

}

app.use(express.static('public'));


// WebSocket Portion
// WebSockets work with the HTTP server
var io = require('socket.io')(server);

setInterval(heartbeat, 33);

function heartbeat() {
  io.sockets.emit('heartbeat', splitblobs);
  io.sockets.emit('rocks', rocks);
  io.sockets.emit('trees', trees);
  io.sockets.emit('timer', timeTilInvasion);
}



// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',
  // We are given a websocket object in our function
  function(socket) {

    console.log("We have a new client: " + socket.id);


    socket.on('start',
      function(data) {
        console.log(socket.id + " " + data.x + " " + data.y + " " + data.r);
        var blob = new Blob(socket.id, data.x, data.y, data.r);
        console.log(splitblobs.length);
        splitblobs.push(blob);
      }
    );

    socket.on('update',
      function(data) {
        //console.log(socket.id + " " + data.x + " " + data.y + " " + data.r);
        //console.log(data.rotation);
        var blob;
        for (var i = 0; i < splitblobs.length; i++) {
          if (socket.id == splitblobs[i].id) {
            blob = splitblobs[i];
          }
        }
        blob.x = data.x;
        blob.y = data.y;
        blob.r = data.r;
        blob.rotation = data.rotation;

        if (millitimer > 0)
          millitimer--;
        else {
          if (timeTilInvasion > 0)
            timeTilInvasion--;
          millitimer = 60;
        }
      }
    );



    socket.on('disconnect', function() {
      console.log("Client has disconnected");
    });
  }
);
