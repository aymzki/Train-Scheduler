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
  var trainName = $("#name-input").val().trim();
  var whereTo = $("#destination-input").val().trim();
  var firstTime = $("#firsttime-input").val().trim();
  var freq = $("#freq-input").val().trim();

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
database.ref().on("child_added", function(childSnapshot) {
  //console.log(childSnapshot.val());

  //Store everything into a variable
  var trainName = childSnapshot.val().name;
  var whereTo = childSnapshot.val().where;
  var firstTime = childSnapshot.val().time;
  var freq = childSnapshot.val().frequency;

  //Train Info
  // console.log(trainName);
  // console.log(whereTo);
  // console.log(firstTime);
  // console.log(freq);

  //Clean up the time 

  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  var tRemainder = diffTime % freq;
  console.log(tRemainder);


  //Make calculation for Minutes Away moment.js

  var tMinutesTillTrain = freq - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  //Make calculation for Next Arrival moment.js

  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

  
  
  //Create new row
  var makeRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(whereTo),
    $("<td>").text(freq),
    $("<td>").text(moment(nextTrain).format("HH:mm")),
    $("<td>").text(tMinutesTillTrain),
  );
  //Append new row to the table
  $(".trainTable").append(makeRow);
});

