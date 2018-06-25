## Background and Overview

CodeUp is a voice-assistant code training/trivia app. The idea is that the app can be invoked via hotword: "Okay Google, talk to CodeUp" or via deeplink: "Okay Google, talk to CodeUp about SQL." 

The app will be able to begin a conversation with the user, offering trivia questions related to that topic if invoked via audio, and text-based code challenges (or trivia) if invoked on a device with a screen.

Users will be able to continue the conversation until they choose to stop, and the app will be able to keep track of scores throughout the conversation and (perhaps) across sessions.

### Wireframes and mockups
![Logos](https://github.com/jubby2000/code-up/blob/master/logo-mockups.png?raw=true)
![Demo site](https://github.com/jubby2000/code-up/blob/master/codeup_wireframes.png?raw=true)

## Functionality and MVP

* **Basic Startup**: Users can invoke and stop the app using custom hotword (“Okay Google, let me talk to CodeUp”, “stop”)
    1. Done with Dialogflow GUI
* **Trivia Initialization**: Users can choose a category and a desired number of questions.
    1. Checks in frontend for availability of chosen category
* **Basic trivia logic**: Looping through questions, presenting options for each question and responding to correct answers
    1. POST request to backend and return response, correct answer checking done too
* **Full functionality**: Keeping track of scores, multiple play-through, fallbacks and error-handling
* **Demo site**: With demo of the app and other screenshots + information


### Bonus
* Alexa Skill
* Live demo on demo site
* Live stats on coding subjects

## Technologies and Technical Challenges

* Node.js backend to handle intent requests, conversation logic and retrieving database data.
* Firebase will handle asset, database, and function storage.
* Dialogflow on the "frontend" to train the AI on which user phrases to capture as variables

### Key Challenges
1. Seeding a large amount of data into the database (JSON format), in a way that can be retrieved appropriately
2. Separating logic for if a user's device has a screen or if it's audio only and serving up appropriate content and conversation flow
3. Reduce latency as low as possible to improve user experience

## Schema Considerations
Easier to query, less variety in terms of incorrect answer options
```javascript
{
  "Questions": {
    "Q1": "What are all the values that are considered falsey in JavaScript?"
    }
  "Answers": {
    "A1": {
       "body": "null and NaN",
       "q_id": "Q1",
       "answer_type": false
      },
    "A2": {
       "body": "zeros, empty strings, undefined, null, and NaN",
       "q_id": "Q1",
       "answer_type": true
      },
    "A3": {
       "body": "zeros, ones, empty strings, undefined, null, and NaN",
       "q_id": "Q1",
       "answer_type": false
      }
    },
  "Tags": {
    "T1": "JavaScript",
    "T2": "Ruby",
    "T3": "React",
    "T4": "Ruby on Rails",
    "T5": "Data Types",
    "T6": "Variables"
    },
  "Question_taggings": {
    "Q1": {
      "T1": "JavaScript",
      "T5": "Data Types"
     },
    "Q2": {
      "T1": "JavaScript",
      "T6": "Variables"
     }
    },
  "Answer_taggings": {
    "A1": {
      "T1": "JavaScript",
      "T5": "Data Types"
     },
    "A2": {
      "T1": "JavaScript",
      "T5": "Data Types"
      },
    "A3": {
      "T1": "JavaScript",
      "T5": "Data Types"
      }
    }
  }
```

More variety, and also more required up front in terms of questions and answer design:
```javascript
{
  "Questions": {
    "Q1": {
      "body": "What are all the values that are considered falsey in JavaScript?",
      "correct_answer_id": "A2"
      },
    "Q2": {
      "body": "How do we declare a constant 'favFood' using ES6+ syntax?",
      "correct_answer_id": "A6"
      }
    }
  "Answers": {
    "A1": "body": "null and NaN",
    "A2": "body": "zeros, empty strings, undefined, null, and NaN",
    "A3": "body": "zeros, ones, empty strings, undefined, null, and NaN",
    "A4": "body": "var favFood = 'pizza';",
    "A5": "body": "let favFood = 'pizza';",
    "A6": "body": "const favFood = 'pizza';"
    },
  "Tags": {
    "T1": "JavaScript",
    "T2": "Ruby",
    "T3": "React",
    "T4": "Ruby on Rails",
    "T5": "Data Types",
    "T6": "Variables"
    },
  "Question_taggings": {
    "Q1": {
      "T1": "JavaScript",
      "T5": "Data Types"
     },
    "Q2": {
      "T1": "JavaScript",
      "T6": "Variables"
     }
    },
  "Answer_taggings": {
    "A1": {
      "T1": "JavaScript",
      "T5": "Data Types"
     },
    "A2": {
      "T1": "JavaScript",
      "T5": "Data Types"
      },
    "A3": {
      "T1": "JavaScript",
      "T5": "Data Types"
      },
    "A4": {
      "T1": "JavaScript",
      "T5": "Variables"
      },
    "A5": {
      "T1": "JavaScript",
      "T5": "Variables"
      },
    "A6": {
      "T1": "JavaScript",
      "T5": "Variables"
      }
    }
  }
```

## Things Accomplished Over the Weekend
* Research MERN stack, and decide against it in favor of Node.js and Firebase for compatibility
* Build sample projects (Actions on Google) to get an idea of where we need to diverge
* Begin building conversation logic

## Group Members and Work Breakdown
**Farah Quader, Jacob Barlow, Ken Chan, Shashank Racherla**
* W11D1 - Finalize Firebase storage schema, tie into Node **Farah, Jacob**
* W11D2 - Build seed slices **All**
* W11D3 - Build seed slices **All**
* W11D4 - Build seed slices **All**
* W11D5 - Build seed slices **All**
* W11D6 - Build demo site **Ken, Shasha**
* W11D7 - Build demo site **Ken, Shasha**
