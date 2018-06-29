## Table of Contents
* [Introduction](#Introduction)
* [Technologies](#Technologies)
* [Technical Challenges](#Technical-Challenges)
* [Database Schema](#Database-Schema)
* [Future Improvements](#Future-Improvements)
* [Contributors](#Contributors)

## Introduction

CodeUp is a Google Assistant Code Training and Trivia App. Users can learn about languages like Ruby, JavaScript, SQL, HTML and CSS.
The idea is that the app can be invoked via a hotword: "Okay Google, talk to CodeUp" or via a deeplink: "Okay Google, talk to CodeUp about SQL". 

The app begins a conversation with the user, offering trivia questions related to the language of their choice.

Users continue the conversation until they choose to stop -the app keeps track of scores throughout the conversation.
!!! IMAGE!!!!

## Technologies
firebase
nodejs
dialogflow
actions on google
![Firebase]()
For our Database we chose to use Google Firebase's Realtime Database Platform in order to integrate well with our other technologies (more on this later). Firebase handles asset, database, and function storage. !!!It stores the data in JSON format in its NoSQL database.!!! 

![NodeJs]()
We went with Node.js for the backend to handle User Intent requests, conversation logic and query the database.

![DialogFlow]()
DialogFlow bridges Actions on Google to Node.js, allowing us to utilize its Natural Language Understanding (NLU) SDK to parse user speech and text responses. It provides a console where conversation can be structured using Intents and Entities. An Intent represents a mapping between what user says and what action should be taken by your software. Entites are used to extract parameter values from natural language inputs. We can also train the AI on which user phrases to capture as entities.

![Actions on Google]()
Actions on Google is what allows us to use Google Assistant as our frontend. We used it as our entry point to create our app and send user input to our NLU SDK (DialogFlow).


![Logos](https://github.com/jubby2000/code-up/blob/master/logo-mockups.png?raw=true)
![Demo site](https://github.com/jubby2000/code-up/blob/master/codeup_wireframes.png?raw=true)

## Technical Challenges
1. Seeding a large amount of data into the database (JSON format), in a way that can be retrieved appropriately
2. Separating logic for if a user's device has a screen or if it's audio only and serving up appropriate content and conversation flow
3. Reduce latency as low as possible to improve user experience


## Database Schema
We stored our question and answer seed data in JSON Format in a NoSQL database hosted remotely on a cloud platform provided by Google Firebase.
```javascript
{
    "questions": [
        {
            "question": "Which of the following is not a valid data type?",
            "correctAnswer": "Array",
            "tags": "JavaScript",
            "wrongAnswer": [ "Number", "String" ]
        },
        {
            "question": "How many basic data types are there in JavaScript?",
            "correctAnswer": "7",
            "tags": "JavaScript",
            "wrongAnswer": [ "5", "10" ]
        }
    ]
}
```

## Contributors
* [Farah Quader](https://www.github.com/FarahYQ)
* [Jacob Barlow](https://www.github.com/jubby2000)
* [Ken Chan](https://www.github.com/kchansf5)
* [Shashank Racherla](https://www.github.com/srac1777)


### Future Improvements
We plan on improving CodeUp with the following features in the future:
* Make it available on Amazon Products as an Alexa Skill
* Allow Users to create profiles and view their quiz history and stats
* Expand on the languages available for training

