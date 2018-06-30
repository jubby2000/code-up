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
![](./assets/readme-logos/hero-banner.png)

## Technologies
firebase
nodejs
dialogflow
actions on google
![Firebase](./assets/readme-logos/firebase.png)
For our Database we chose to use Google Firebase's Realtime Database Platform in order to integrate well with our other technologies (more on this later). Firebase handles asset, database, and function storage. !!!It stores the data in JSON format in its NoSQL database.!!!

![NodeJs](./assets/readme-logos/nodejs.png)
We went with Node.js for the backend to handle User Intent requests, conversation logic and query the database.

![DialogFlow](./assets/readme-logos/dialogflow.png)
DialogFlow bridges Actions on Google to Node.js, allowing us to utilize its Natural Language Understanding (NLU) SDK to parse user speech and text responses. It provides a console where conversation can be structured using Intents and Entities. An Intent represents a mapping between what user says and what action should be taken by your software. Entites are used to extract parameter values from natural language inputs. We can also train the AI on which user phrases to capture as entities.

![Actions on Google](./assets/readme-logos/actions.png)
Actions on Google is what allows us to use Google Assistant as our frontend. We used it as our entry point to create our app and send user input to our NLU SDK (DialogFlow).

!!!SCROLLING GIF OF CODEUP DEMO SITE!!!

## Technical Challenges
There were several main challenges that we encountered while building CodeUp:

1. The core of our app relies on fluid conversation between the user and the app. Any slight discrepancies would result in a poor user experience, especially due to the medium of interaction. The challenge was to figure out a way to structure the conversation such that the app would function logically and the user would have an intuitive experience.

Our solution was to leverage the available contexts and intents of Google's DialogFlow to mimic a natural conversation between two humans.


contexts
when a person says something to another person, both of them are aware of the context which is being referenced
in our case, the user is aware of the context, buy DF needs the context to be explicitly defined for it to understand

intents
whenever a user says something, they say it with a certain intent. we capture that intent using the DF intent feature. and extract important variables as entities.  

build something that resembles a normal conversation with context and intents

context
Intent
how the context and intent are interpreted by the app
basically trying to think like a computer in a way that would make it seem human to humans

sub topic - handling unexpected user responses

Seeding a large amount of data into the database (JSON format), in a way that can be retrieved appropriately



2. Cannot debug easily having an audio only interface. To make the most of our  bad situation, we made to code review multiple times before deploying and testing. Although this is not a challenge that could be overcome, we took measures which involved continuous deployments and manual testing in order to ensure

because we didn't have code to look at for the front end, we ended up deploying continuously
dialogflow does not show raw code to debug

we came up with a phases of when we should deploy and test. this was pretty much an organized way to test and not waste time hitting bugs when we weren't ready to test  


e testing process as fluid and straightforward as possible.






3. Randomizing Question Sets and Shuffling Answer Choices

In order for the experience to not seem repetitive or predictable, we needed to query the database in a way that would produce a random set of questions. This was a challenge because we



Out of our large data set of questions we had to select five questions that belonged to the same category.

because our DB stores answers in a predefined order, and we are doing a trivia app, it would defeat the purpose of quizzing the user if the correct answer is at a fixed position.

to solve this, we implemented a shuffle function to randomize the order in which the answer choices were displayed to the user.

we also








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
