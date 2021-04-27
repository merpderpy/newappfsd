const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

// onDelete, onUpdate, onWrite
exports.firestoreFunction = functions.firestore.document('/users/{userId}').onCreate((docSnap) => {
    console.log("new user created")
})


// onCreate, onDelete
exports.sendEmail = functions.auth.user().onCreate((user) =>{
    //send email to user.email
})

exports.scheduled = functions.pubsub.schedule('every 10 minutes').onRun((context) =>{
    console.log("10 minutes!")
})