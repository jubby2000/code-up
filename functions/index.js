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
// const question_set = rootRef.child('Questions')
//                             .orderByChild('Tags')
//                             .limitToFirst(1).on('value', snap => {
//                               console.log('value', snap.val());
//                             });
// Import the Dialogflow module from the Actions on Google client library.
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
  conv.ask(new Permission({
    context: 'Hi there, to get to know you better',
    permissions: 'NAME',
  }));
});

// Handle the Dialogflow intent named 'actions_intent_PERMISSION'. If user
// agreed to PERMISSION prompt, then boolean value 'permissionGranted' is true.
app.intent('actions_intent_PERMISSION', (conv, params, permissionGranted) => {
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

// const colorMap = {
//   'indigo taco': new BasicCard({
//     title: 'Indigo Taco',
//     image: {
//       url: 'https://storage.googleapis.com/material-design/publish/material_v_12/assets/0BxFyKV4eeNjDN1JRbF9ZMHZsa1k/style-color-uiapplication-palette1.png',
//       accessibilityText: 'Indigo Taco Color',
//     },
//     display: 'WHITE',
//   })
// };

app.intent('programming language - select.number', (conv, { language, number }) => {
  let question_set;
  rootRef.child('Questions').orderByChild('Tags').limitToFirst(1).on('value', snap => {
    question_set = snap.val().Question;
  });
  conv.close(
    `Got it, ${language} and ${number} questions. Let's do it.` +
    `${question_set}`
  );
});

// app.intent('programming language - select.number', (conv, { language, number }) => {
//   conv.close(`Got it, ${language} and ${number} questions. Let's do it.`);
// });


// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
