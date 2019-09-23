//Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyBZeXAGfmNC6pWFa_cvgTw7ccft186RaGw",
  authDomain: "train-scheduler-cfe6d.firebaseapp.com",
  databaseURL: "https://train-scheduler-cfe6d.firebaseio.com",
  projectId: "train-scheduler-cfe6d",
  storageBucket: "",
  messagingSenderId: "461375329203",
  appId: "1:461375329203:web:4dd106b6486187101b71c6"
};

firebase.initializeApp(firebaseConfig);

//Reference to database
var database = firebase.database();

//Submit Button to add trains
$("#submit-btn").on("click", function(event) {
  event.preventDefault();


  // Grab user inputs
  var trainName = $("name-input").val().trim();
  var whereTo = $("destination-input").val().trim();
  var firstTime = moment($("firsttime-input").val().trim(), "HH:mm").format("LT");
  var freq = $("freq-input").val().trim();

  //Create local temporary object for all this data
  var newTrain = {
    name: trainName,
    where: whereTo,
    time: firstTime,
    frequency: freq,
  };

  //Upload it to database (this is to local db or firebase db?)
  database.ref().push(newTrain);

  //Log everything to console
  console.log(newTrain.name);
  console.log(newTrain.where);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  alert("Train successfully added");

  // Clears all text boxes
  $("#name-input").val("");
  $("#destination-input").val("");
  $("#firstTime-input").val("");
  $("#freq-input").val("");

});

//Create Firebase event for adding train info to database
//Also add row in html when there is data input

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  //Store everything into a variable
  var trainName = childSnapshot.val().name;
  var whereTo = childSnapshot.val().where;
  var firstTime = childSnapshot.val().time;
  var freq = childSnapshot.val().frequency;

  //Train Info
  
  console.log(trainName);
  console.log(whereTo);
  console.log(firstTime);
  console.log(freq);

  //Clean up the time
  //Create new row
  //Append new row to the table
});
