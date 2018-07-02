'use strict';

// Import Firebase-admin and initialize app.
const admin = require('firebase-admin');

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyD7t2UELyolG2mRLVk1XvYoJi30TffOo8A',
  authDomain: "code-up-927cb.firebaseapp.com",
  databaseURL: "https://code-up-927cb.firebaseio.com/"
};

admin.initializeApp(config);

// Reference database.
const rootRef = admin.database().ref();

const successSound = 'https://actions.google.com/sounds/v1/crowds/battle_crowd_celebrate_stutter.ogg';
const failSound = 'https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg';
const calculateSound = 'https://actions.google.com/sounds/v1/office/keyboard_typing_fast.ogg';
const gameOverSound = 'https://actions.google.com/sounds/v1/cartoon/cartoon_metal_thunk.ogg';
const answersFallbacks = [
  'Answers Fallback', 
  'Answer 2 Fallback', 
  'Answer 3 Fallback', 
  'Answer 4 Fallback', 
  'Answer 5 Fallback'
];

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
// app.intent('Default Welcome Intent', (conv) => {
//   conv.data.count = 0;
//   conv.ask(new Permission({
//     context: 'Hi there, to get to know you better',
//     permissions: 'NAME',
//   }));
// });

// Handle the Dialogflow intent named 'actions_intent_PERMISSION'. If user
// agreed to PERMISSION prompt, then boolean value 'permissionGranted' is true.
// app.intent('actions_intent_PERMISSION', (conv, params, permissionGranted) => {
//   if (!permissionGranted) {
//     conv.ask(`Ok, no worries. What programming language would you like to learn?`);
//   } else {
//     conv.data.userName = conv.user.name.given;
//     conv.ask(`Thanks, ${conv.data.userName}. What programming language would you like to learn?`);
//   }
// }); 

app.intent('Default Welcome Intent', (conv) => {
  conv.ask(`<speak>Welcome to CodeUp Trivia! What programming language would you like to learn?</speak>`);
})

app.intent('programming language', (conv, { programmingLanguage }) => {
  conv.data.count = 0;
  const getQuestions = rootRef.child('questions').orderByChild('tags').equalTo(programmingLanguage).once('value');
  return getQuestions.then(snapshot => {
    let allQuestions = Object.keys(snapshot.val()).map(key => snapshot.val()[key]);
    conv.data.questions = shuffleArray(allQuestions).slice(0, 5);
    conv.data.answer = conv.data.questions[0].correctAnswer;

    // Create randomly ordered answers array based on total # of answers
    let answers_count  = conv.data.questions[0].wrongAnswer.length + 1;
    conv.data.answers = getAnswers(conv, 0, answers_count);
    // Create prompt for answers
    let a_prompt = answer_prompt(answers_count, conv);
    
    conv.ask(`Got it, ${programmingLanguage}. Let's do it. ${ conv.data.questions[0].question }`);
    return conv.ask(a_prompt);
  })
});

app.intent('programming language - answer1', (conv, { answer }) => {
  let answer_idx = ['a','b','c'].indexOf(answer);
  let correct_answer_idx = conv.data.answers.indexOf(conv.data.answer);
  
  if (answer_idx === correct_answer_idx) {
    conv.data.count += 1;
    conv.ask(`<speak><audio src="${successSound}" clipEnd="2.0s" fadeOutDur="3.0s">` +
    `</audio><break time="200ms"/>Wow, first try! Nice job. Next question: `+
    `${conv.data.questions[1].question}</speak>`);
  } else {
    conv.ask(`<speak><audio src="${failSound}"></audio>` +
    `Sorry, the answer was ${conv.data.answer}. ` +
    `Next question: ${conv.data.questions[1].question}</speak>`);
  }
  
  conv.data.answer = conv.data.questions[1].correctAnswer;
  
  // Create randomly ordered answers array based on total # of answers
  let answers_count  = conv.data.questions[1].wrongAnswer.length + 1;
  conv.data.answers = getAnswers(conv, 1, answers_count);
  
  // Create prompt for answers
  let a_prompt = answer_prompt(answers_count, conv);
  
  conv.ask(a_prompt);
});

app.intent('programming language - answer2', (conv, { answer }) => {
  let answer_idx = ['a','b','c'].indexOf(answer);
  let correct_answer_idx = conv.data.answers.indexOf(conv.data.answer);
  
  if (answer_idx === correct_answer_idx) {
    conv.data.count += 1;
    conv.ask(`<speak><audio src="${successSound}" clipEnd="2.0s" fadeOutDur="3.0s"></audio>` +
    `<break time="200ms"/>You got it! Here's your next one: ${conv.data.questions[2].question}</speak>`);
  } else {
    conv.ask(`<speak><audio src="${failSound}"></audio>` +
    `Nope, the answer was ${conv.data.answer}. ` +
    `Here's your next one: ${conv.data.questions[2].question}</speak>`);
  }
  conv.data.answer = conv.data.questions[2].correctAnswer;
  
  // Create randomly ordered answers array based on total # of answers
  let answers_count  = conv.data.questions[2].wrongAnswer.length + 1;
  conv.data.answers = getAnswers(conv, 2, answers_count);
  
  // Create prompt for answers
  let a_prompt = answer_prompt(answers_count, conv);
  
  conv.ask(a_prompt);
});

app.intent('programming language - answer3', (conv, { answer }) => {
  let answer_idx = ['a','b','c'].indexOf(answer);
  let correct_answer_idx = conv.data.answers.indexOf(conv.data.answer);
  
  if (answer_idx === correct_answer_idx) {
    conv.data.count += 1;
    conv.ask(`<speak><audio src="${successSound}" clipEnd="2.0s" fadeOutDur="3.0s"></audio>` +
    `<break time="200ms"/>You got it! Here's your next one: ${conv.data.questions[3].question}</speak>`);
  } else {
    conv.ask(`<speak><audio src="${failSound}"></audio>` +
    `Nope, the answer was ${conv.data.answer}. ` +
    `Here's your next one: ${conv.data.questions[3].question}</speak>`);
  }
  conv.data.answer = conv.data.questions[3].correctAnswer;
  
  // Create randomly ordered answers array based on total # of answers
  let answers_count  = conv.data.questions[3].wrongAnswer.length + 1;
  conv.data.answers = getAnswers(conv, 3, answers_count);
  
  // Create prompt for answers
  let a_prompt = answer_prompt(answers_count, conv);
  
  conv.ask(a_prompt);
});

app.intent('programming language - answer4', (conv, { answer }) => {
  let answer_idx = ['a','b','c'].indexOf(answer);
  let correct_answer_idx = conv.data.answers.indexOf(conv.data.answer);
  
  if (answer_idx === correct_answer_idx) {
    conv.data.count += 1;
    conv.ask(`<speak><audio src="${successSound}" clipEnd="2.0s" fadeOutDur="3.0s"></audio>` +
    `<break time="200ms"/>You got it! Alright, final question: ${conv.data.questions[4].question}</speak>`);
  } else {
    conv.ask(`<speak><audio src="${failSound}"></audio>` +
    `Nope, the answer was ${conv.data.answer}. ` +
    `Alright, final question: ${conv.data.questions[4].question}</speak>`);
  }
  conv.data.answer = conv.data.questions[4].correctAnswer;
  
  // Create randomly ordered answers array based on total # of answers
  let answers_count  = conv.data.questions[4].wrongAnswer.length + 1;
  conv.data.answers = getAnswers(conv, 4, answers_count);
  
  // Create prompt for answers
  let a_prompt = answer_prompt(answers_count, conv);
  
  conv.ask(a_prompt);
});

app.intent('programming language - answer5', (conv, { answer }) => {
  let answer_idx = ['a','b','c'].indexOf(answer);
  let correct_answer_idx = conv.data.answers.indexOf(conv.data.answer);
  
  if (answer_idx === correct_answer_idx) {
    conv.data.count += 1;
    conv.ask(`<speak><audio src="${successSound}" clipEnd="2.0s" fadeOutDur="3.0s">` +
    `</audio><break time="200ms"/>You got it!<break time="100ms"/>` +
    `<audio src="${gameOverSound}" clipStart="2.5s" clipEnd="3.5s">` +
    `</audio>That sound means we're at the end of this round, let's check your score.` +
    `<audio src="${calculateSound}" soundLevel="+30dB" fadeOutDur="2.0s" clipEnd="2.0s"></audio></speak>`);
  } else {
    conv.ask(`<speak><audio src="${failSound}"></audio>Nope, the answer was ${conv.data.answer}.` +
    `<audio src="${gameOverSound}" clipStart="2.5s" clipEnd="3.5s">` +
    `</audio>That sound means we're at the end of this round, let's check your score.` +
    `<audio src="${calculateSound}" soundLevel="+30dB" fadeOutDur="2.0s" clipEnd="2.0s"></audio></speak>`);
  }
  conv.ask(`<speak>You got ${conv.data.count} right! Would you like to go again?</speak>`);
});

answersFallbacks.forEach(fallback => {
  app.intent(`${fallback}`, (conv) => {
    if (conv.data.answers.length === 2) {
      conv.ask(`Your answer might be right. Try choosing 'a' or 'b'.`);
    } else {
      conv.ask(`Your answer might be right. Try choosing 'a', 'b', or 'c'.`);
    }
  })
});

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const answer_prompt = function(count, conv) {
  if ( count === 2 ) {
    return `Is it\n` +
    `a. ${conv.data.answers[0]}? or\n` +
    `b. ${conv.data.answers[1]}?`;
  } else {
    return `Is it\n` +
    `a. ${conv.data.answers[0]}?\n` +
    `b. ${conv.data.answers[1]}? or\n` +
    `c. ${conv.data.answers[2]}?`;
  }
}

const getAnswers = (conv, questionNumber, answers_count) => {
  let rand_idx = Math.floor(Math.random() * answers_count);
  let answers = conv.data.questions[questionNumber].wrongAnswer;
  answers.splice(rand_idx, 0, conv.data.answer);
  return answers;
}

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
