// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyByxqikSZbeR2uMZJ-DIOXTpACrLgElfxY",
    authDomain: "contact-icoder.firebaseapp.com",
    databaseURL: "https://contact-icoder-default-rtdb.firebaseio.com",
    projectId: "contact-icoder",
    storageBucket: "contact-icoder.appspot.com",
    messagingSenderId: "652403287619",
    appId: "1:652403287619:web:cbcf0bf44dfa49b5dd16f6",
    measurementId: "G-1Y9Z6VX6M6"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()
  
  // Set up our register function
  function register () {
    // Get all our input fields
    email = document.getElementById('email').value
    // password = document.getElementById('password').value
    password = "123456"
    full_name = document.getElementById('full_name').value
    query = document.getElementById('query').value
    topic = document.getElementById('topic').value
  
    // Validate input fields
    if (validate_email(email) == false) {
      alert('Email or Password is Outta Line!!')
      return
      // Don't continue running the code
    }
   
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        email : email,
        full_name : full_name,
        query : query,
        topic : topic,
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)
  
      // DOne
      alert('Query sent!! We will contact you asap')
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  
  
  
  // Validate Functions
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  