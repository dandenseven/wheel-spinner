import React, { useState } from 'react';
import firebase from 'firebase';
import 'firebase/auth';

// import Login from './components/Login';

export default function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [createUserName, setCreateUsername] = useState("");
    const [createPassword, setCreatePassword] = useState("");
    const [address, setAddress] = useState("");
    const [milage, setMilage] = useState("");
    const [weeklyMilage, setWeeklyMilage] = useState("");

    const firebaseConfig = {
        apiKey: "AIzaSyDEbzt9TfJJZZxuZsH_qXv3eeb5g62GgmE",
        authDomain: "my-finalproject-2b552.firebaseapp.com",
        projectId: "my-finalproject-2b552",
        storageBucket: "my-finalproject-2b552.appspot.com",
        messagingSenderId: "512038742459",
        appId: "1:512038742459:web:cd68f269818ae75585bc9e",
        measurementId: "G-LZBJTEXX4X"
    };
        
    // const firebaseConfig = {
    //     apiKey: process.env.REACT_APP_API_KEY,
    //     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    //     databaseURL: process.env.REACT_APP_DATABASE_URL,
    //     projectId: process.env.REACT_APP_PROJECT_ID,
    //     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    //     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    // };

    // class Firebase {
    //     constructor() {
    //         app.intializeApp(firebaseConfig);
    //     }
    // }
    
    // Initialize Firebase
    // firebase.initializeApp(firebaseConfig);
    !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

    

    function firstNameChangeHandler(e) {
        setFirstName(e.target.value)
    }

    function lastNameChangeHandler(e) {
        setLastName(e.target.value)
    }

    function emailChangeHandler(e) {
        setEmail(e.target.value)
    }

    function userNameChangeHandler(e) {
        setCreateUsername(e.target.value)
    }

    function passwordChangeHandler(e) {
        setCreatePassword(e.target.value)
    }

    function addressChangeHandler(e) {
        setAddress(e.target.value)
    }

    function milageChangeHandler(e){
        setMilage(e.target.value)
    }

    function weeklyChangeHandler(e){
        setWeeklyMilage(e.target.value)
    }



    const sendSignin = async () => {
        const newUserData = JSON.stringify({
            firstname: firstName,
            lastname: lastName,
            email: email,
            username: createUserName,
            password: createPassword,
            address: address,
            milage: milage,
            weeklymilage: weeklyMilage
        })
        const config = {
            method: "POST",
            headers: {"Content_Type": "application/json"},
            body: newUserData

        }

        

        // firebase.auth().createUserWithEmailAndPassword(email, createPassword)
        //     .then((userCredential) => {
        //         // Signed in 
        //         var user = userCredential.user;
        //         // ...
        //     })
        //     .catch((error) => {
        //         var errorCode = error.code;
        //         var errorMessage = error.message;
        //         // ..
        //     });
            
        // firebase.auth().signInWithEmailAndPassword(email, createPassword)
        //     .then((userCredential) => {
        //         // Signed in
        //         var user = userCredential.user;
        //         // ...
        //     })
        //     .catch((error) => {
        //         var errorCode = error.code;
        //         var errorMessage = error.message;
        //     });


        const newUser = await firebase.auth().createUserWithEmailAndPassword(email, createPassword)
        console.log(newUser)

        const response = await fetch("http://localhost:8080/api/Login", config);
        const data = await response.json()
        console.log(data);

        }


    // firebase.auth().createUserWithEmailAndPasswpord(email, password)
    //     const userCredential = async () => {

    //         const user = userCredential.user;

    //     }
    //     try {

    //         catch (error) {
    //         let errorCode = error.code;
    //     }
        // }
        
    return (
        
        <div>
            <label for="fname">first name:</label>
            <input type="text" id="fname" name="fname" onChange={firstNameChangeHandler}></input><br></br>
            <label for="lname">last name:</label>
            <input type="text" id="lname" name="lname" onChange={lastNameChangeHandler}></input><br></br>
            <label for="email">email:</label>
            <input type="text" id="email" name="email" onChange={emailChangeHandler}></input><br></br>
            <label for="cname">username:</label>
            <input type="text" id="cname" name="cname" onChange={userNameChangeHandler}></input><br></br>
            <label for="cpassword">password:</label>
            <input type="text" id="cpassword" name="cpassword" onChange={passwordChangeHandler}></input><br></br>
            <label for="address">address:</label>
            <input type="text" id="address" name="address" onChange={addressChangeHandler}></input><bk></bk>
            <label for="milage">milage:</label>
            <input type="text" id="milage" name="milage" onChange={milageChangeHandler}></input><bk></bk>
            <label for="weekly">weekly:</label>
            <input type="text" id="weekly" name="weekly" onChange={weeklyChangeHandler}></input><bk></bk>
            <button onClick={sendSignin}>Submit</button>
        </div>

        
        )
}

