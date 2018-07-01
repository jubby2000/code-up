## Table of Contents
* [Introduction](#introduction)
* [Technologies](#technologies)
* [Technical Challenges](#technical-challenges)
* [Database Schema](#database-schema)
* [Future Improvements](#future-improvements)
* [Contributors](#contributors)

## Introduction

CodeUp is a Google Assistant Code Training and Trivia App. Users can learn about languages like Ruby, JavaScript, SQL, HTML and CSS.
The idea is that the app can be invoked via a hotword: "Okay Google, talk to CodeUp" or via a deeplink: "Okay Google, talk to CodeUp about SQL". The app begins a conversation with the user, offering trivia questions related to the language of their choice. Users continue the conversation until they choose to stop - the app keeps track of the number of correctly answered questions throughout the conversation.

![](https://github.com/jubby2000/code-up/blob/master/assets/readme-images/hero-banner.png)

## Technologies
![Firebase](https://github.com/jubby2000/code-up/blob/master/assets/readme-images/firebase.png)
For our Database we chose to use Google Firebase's Realtime Database Platform in order to integrate well with our other technologies (more on this later). Firebase handles asset, database, and function storage.

![NodeJs](https://github.com/jubby2000/code-up/blob/master/assets/readme-images/nodejs.png)
We went with Node.js for the backend to handle User Intent requests, conversation logic and query the database.

![DialogFlow](https://github.com/jubby2000/code-up/blob/master/assets/readme-images/dialogflow.png)
DialogFlow bridges Actions on Google to Node.js, allowing us to utilize its Natural Language Understanding (NLU) SDK to parse user speech and text responses. It provides a console where conversation can be structured using Intents and Entities. An Intent represents a mapping between what user says and what action should be taken by your software. Entities are used to extract parameter values from natural language inputs. We can also train the AI on which user phrases to capture as entities.

![Actions on Google](https://github.com/jubby2000/code-up/blob/master/assets/readme-images/actions.png)
Actions on Google is what allows us to use Google Assistant as our frontend. We used it as our entry point to create our app and send user input to our NLU SDK (DialogFlow).

## Technical Challenges
There were several main challenges that we encountered while building CodeUp:

1. The core of our app relies on fluid conversation between the user and the app. Any slight discrepancies would result in a poor user experience, especially due to the medium of interaction. The challenge was to figure out a way to structure the conversation such that the app would function logically and the user would have an intuitive experience.

    When two people communicate, both parties are aware of the context which is being referenced. In our case, the user is    aware of the context but CodeUp is not. This results in a problem where using CodeUp is not intuitive and feels mechanical. Our solution was to leverage the available contexts and intents of Google's DialogFlow to mimic a natural conversation between two humans.


2. Working in Google Firebase and Actions on Google, we were not able to debug in the traditional manner. This was due to the fact that DialogFlow is a console based service and does not output written code in their logs. To work around this, we made sure to code review multiple times before deploying and testing.


3. Randomizing Question Sets and Shuffling Answer Choices

    In order for the experience to not seem repetitive or predictable, we needed to query the database in a way that would produce a random set of questions. This was a challenge because of our large data set and the fact that there are multiple subject tags to sort through. We overcame this challenge by querying the database for questions that belonged to a specific tag and then randomly selecting a set of five to deliver to the user.

    Because our database stores answers in a predefined order, it is not ideal for quizzing purposes. To solve this, we implemented a shuffle function to randomize the order in which the answer choices were displayed to the user.

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
