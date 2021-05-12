# Disgust
## What is it?
Disgust is a react + firebase app for anonymous chatting. You can add whitelisting thru firebase rules, such as
 ```
let isWhitelisted = exists(
  	/databases/$(database)/documents/whitelist/$(request.auth.uid)
);
 ```
 
## How do I set it up?
1. run `npm i`
1. You need to enable Google Auth and Email Auth (with password!) and add the database for "messages".
2. Modify `src/app.js` line 11 to have your firebase auth details 
Example:

``` javascript
firebase.initializeApp({
  apiKey: "ohoho you aren't getting my api key",
  authDomain: "disgust-bot.firebaseapp.com",
  projectId: "disgust-bot",
  storageBucket: "disgust-bot.appspot.com",
  messagingSenderId: "idk if this should be secure but may as well",
  appId: "poop"
})
```
3. run `npm run-script build` in the terminal
4. run `firebase deploy`

then it should be good! (this is my first node app i've put on github so tell me if it doesn't work!)

## Why is it named disgust?
why are you named steve? (pretend that you are named steve and act shocked)
