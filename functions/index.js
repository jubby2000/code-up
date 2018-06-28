'use strict';

// Import Firebase-admin and initialize app.
const admin = require('firebase-admin');

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
const config = {
  apiKey: "AIzaSyD7t2UELyolG2mRLVk1XvYoJi30TffOo8A",
  authDomain: "code-up-927cb.firebaseapp.com",
  databaseURL: "https://code-up-927cb.firebaseio.com/"
};

admin.initializeApp(config);

// Reference database.
const rootRef = admin.database().ref();

const {
  dialogflow,
  BasicCard,
  Permission,
} = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Instantiate the Dialogflow client.
const app = dialogflow({ debug: true });
// Handle the Dialogflow intent named 'Default Welcome Intent'.
app.intent('Default Welcome Intent', (conv) => {
  conv.data.count = 0;
  let score = conv;
  conv.ask(new Permission({
    context: 'Hi there, to get to know you better',
    permissions: 'NAME',
  }));
});

// Handle the Dialogflow intent named 'actions_intent_PERMISSION'. If user
// agreed to PERMISSION prompt, then boolean value 'permissionGranted' is true.
app.intent('actions_intent_PERMISSION', (conv, params, permissionGranted) => {
  // conv.data.count += 1;
  if (!permissionGranted) {
    conv.ask(`Ok, no worries. What programming language would you like to learn?`);
  } else {
    conv.data.userName = conv.user.name.given;
    conv.ask(`Thanks, ${conv.data.userName}. What programming language would you like to learn?`);
  }
});

// Handle the Dialogflow intent named 'favorite color'.
// The intent collects a parameter named 'color'.
app.intent('programming language', (conv, { programmingLanguage }) => {
  conv.data.count += 5;
  const luckyNumber = programmingLanguage.length;
  const audioSound = 'https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg';
  if (conv.data.userName) {
    conv.ask(`<speak>${programmingLanguage}, got it. ` +
      // ` ${conv.data.userName}, your lucky number is ` +
      // `${luckyNumber}.<audio src="${audioSound}"></audio>` +
      `How many questions would you like?</speak>`);
  } else {
    conv.ask(
      // `<audio src="${audioSound}"></audio>` +
      `<speak>How many questions would you like?</speak>`);
  }
});

app.intent('programming language - select.number', (conv, { language, number }) => {
  return getQuestions.then(snapshot => {
    let question_set = snapshot.val();
    conv.data.questions = question_set;
    return conv.close(
      `Got it, ${language} and ${number} questions. Let's do it. ` +
      `${question_set[0].Question}`
    )
  })
});



// app.intent('programming language - select.number', (conv, { language, number }) => {
//   conv.data.count += 5;
//   conv.data.questions = [];
//   let score = conv.data.count;
//   return getQuestions.then(snapshot => {
//     let question_set = snapshot.val()[0].Question;
//     conv.data.questions = snapshot.val();
//     let first_q = conv.data.questions;
//     console.log(`${ first_q[0].Question}===========================`);
//     return conv.close(
//       `Got it, ${language} and ${number} questions. Let's do it. ` +
//       `${question_set}` +
//       `Your score is ${score}`
//     )
//   })
// });





const getQuestions = rootRef.child('Questions').orderByChild('Tags').limitToFirst(5).once('value');
// app.intent('programming language - select.number', (conv, { language, number }) => {
//   conv.close(`Got it, ${language} and ${number} questions. Let's do it.`);
// });


// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
