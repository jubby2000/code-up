## Background and Overview

CodeUp is a voice-assistant code training/trivia app. The idea is that the app can be invoked via hotword: "Okay Google, talk to CodeUp" or via deeplink: "Okay Google, talk to CodeUp about SQL." 

The app will be able to begin a conversation with the user, offering trivia questions related to that topic if invoked via audio, and text-based code challenges (or trivia) if invoked on a device with a screen.

Users will be able to continue the conversation until they choose to stop, and the app will be able to keep track of scores throughout the conversation and (perhaps) across sessions.

## Functionality and MVP

1. Users can invoke and stop the app using custom hotword (“Okay Google, let me talk to CodeUp”, “stop”)
2. Users can choose a category and a desired number of questions.
3. Basic trivia logic (looping through questions, and responding to correct answers)
4. Full functionality (keeping track of scores, multiple play-through, fallbacks and error-handling)
5. Demo site

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
