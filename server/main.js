var express = require('express');
var app = express();
var server = require('http').Server(app)
var io = require('socket.io')(server);

const sports = [
    { id: 'sport_1', name: 'Crossfit', description: 'High Intensity Training', image: '../../assets/card-crossfit.jpg' },
  { id: 'sport_2', name: 'Yoga and Pilates', description: 'Physical and Mental Discipline', image: '../../assets/card-yoga.jpg' },
  { id: 'sport_3', name: 'Functional', description: 'Function is Purpose', image: '../../assets/card-functional.jpg' },
  { id: 'sport_4', name: 'MMA', description: 'Mixed Martial Arts', image: '../../assets/card-mma.jpg' }
];

// app.user(express.static('public))
// io.on('connection', function(socket){
//     console.log('socket connection opened')
// });

io.on("connection", socket => {
    console.log('socket connection opened')
    socket.emit("sports", sports);

socket.on("getSport", sportId => {
    safeJoin(sportId);
    socket.emit("sport", function(){
      for (sport of sports) {
        if(sports[sport].id === sportId) {
          return sports[sport];
        }
      }
    });
  });


  socket.on("addSport", sport => {
    console.log(sport);
    sports.unshift( sport.sport );
    io.sockets.emit("sports", sports);
    // io.emit("sport", sport);
  });
});
app.get('/', function(req, res){
    res.status(200).send("All Good");
})
server.listen(8008, function(){
    console.log("server running")
})