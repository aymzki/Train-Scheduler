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

  
// var trainName
// var whereTo 
// var firstTime -- in military time
// var freq -- in minutes