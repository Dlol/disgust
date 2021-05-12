import React, { useState, useRef } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

// put your api things here!

const auth = firebase.auth();
var firestore = firebase.firestore();
//firestore.useEmulator("localhost", 8080);
//auth.useEmulator("http://localhost:9099");

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header className="App-header">
        <SignOut/>
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn/>}
      </section>
    </div>
  );
}

function SignIn(){
  const [Email, setEmail] = useState('');
  const [Pass, setPass] = useState('');
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  const emailSignUp = (e) => {
    auth.createUserWithEmailAndPassword(Email, Pass);
  }
  const emailSignIn = (e) => {
    auth.signInWithEmailAndPassword(Email, Pass);
  }
  return (
    <div>
    <button onClick={signInWithGoogle}>google signin</button>
    <form className="signin" onSubmit={(e)=>{e.preventDefault()}}>
      <input className="email" type="email" value={Email} onChange={(e) => setEmail(e.target.value)} placeholder="email"/> <br/>
      <input className="password" type="password" value={Pass} onChange={(e) => setPass(e.target.value)} placeholder="password"/> <br/>
      <button onClick={emailSignUp} className="up"> Sign Up </button> 
      <button onClick={emailSignIn} className="in"> Sign In </button>
    </form>
    </div>
  )
}

function SignOut(){
  return auth.currentUser && (
    <button onClick={() => auth.signOut()} className="so">Sign Out</button>
  )
}

function ChatRoom(){
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createAt','desc').limit(75);
  const [messages] = useCollectionData(query, {idField:'id'})
  const dummy = useRef();

  const [FormValue, setFormValue] = useState();

  const sendMessage = async(e) => {
    const valform = FormValue;
    setFormValue("")
    e.preventDefault();
    await messagesRef.add({
      text: valform,
      createAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    dummy.current.scrollIntoView({behavior : 'smooth'});
  }

  return(
    <div>
    <div>
      <div ref={dummy}></div>
      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
    </div>
    <form onSubmit={sendMessage} className="form">
      <textarea placeholder="Type message here" value={FormValue} onChange={(e) => setFormValue(e.target.value)}/>
      <button type="submit">send</button>
    </form>
    </div>
  )
}

function ChatMessage(props){
  const { text, uid } = props.message;

  return (<div className="message"><p className="msg">{text}</p></div>);
}

export default App;
