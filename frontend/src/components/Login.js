import React, { useState } from 'react';
import firebase from 'firebase';
import 'firebase/auth';

export default function Login({ loginFunc }) {
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");


    function useremailChangeHandler(e) {
        setInputEmail(e.target.value)
    }

    function passwordChangeHandler(e) {
        setInputPassword(e.target.value)
    }

    const firebaseConfig = {
        apiKey: ,
        authDomain: 
        projectId: ,
        storageBucket: ",
        messagingSenderId: "512038742459",
        appId: ,
        measurementId: "G-LZBJTEXX4X"
    };

    !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

    const sendLogin = async () => {
        const userData = JSON.stringify({
            username: inputEmail,
            password: inputPassword
        })
        const config = {
            method: "POST",
            headers: {"Content_Type": "application/json"},
            body: userData

        }


        const loginUser = await firebase.auth().signInWithEmailAndPassword(inputEmail, inputPassword)
        console.log(loginUser)

        const response = await fetch("http://localhost:8080/api/Login", config);
        const data = await response.json()
        console.log(data); 
    }

     return (
        <div>
          <h3>Login</h3>
          <p>email</p><input type="email" onChange={useremailChangeHandler}/><br/>
          <p>password</p><input type="password" onChange={passwordChangeHandler}/><br/>
          <button onClick={sendLogin}>Login</button><bk/>
          {/* <p> Don't have an accoun? <Link to={Signup}>SignUp</Link></p> */}
        </div>
    )
}

