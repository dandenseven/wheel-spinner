import React, { useContext, useState, useEffect } from 'react';
import { FirebaseContext } from '../Firebase';
import { AuthUserContext, withAuthorization } from '../Session';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



function AddUser() {
    const[username, setUsername] = useState("")
    const[email, setEmail] = useState("")
    const[first_name, setFirstName] = useState("")
    const[last_name, setLastName] = useState("")
    const[home_lat, setHomeLat] = useState("")
    const[home_long, setHomeLong] = useState("")

    const[success, setSuccess] = useState(true)
    

    const userId = useContext(FirebaseContext).auth.currentUser.uid


    async function addUser() {
        const body = JSON.stringify({
            username: username,
            email: email,
            first_name: first_name,
            last_name: last_name,
            home_lat: home_lat,
            home_long: home_long,
            user_id: userId
        })
        const configs = {
            method: 'post',
            body: body,
            headers: {"Content-Type": "application/json"}
        }
        const response = await fetch("http://localhost:5000/api/users_add", configs);
        const success = await response.json();
        setSuccess(success.status);
    }

    return (

        <div>
            <div>
                <h2>Add a new user</h2>
                <input
                type="text"
                placeholder="Username"
                onChange={e => setUsername(e.target.value)}
                />
                <input
                type="text"
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
                />
                <input
                type="text"
                placeholder="First Name"
                onChange={e => setFirstName(e.target.value)}
                />
                <input
                type="text"
                placeholder="Last Name"
                onChange={e => setLastName(e.target.value)}
                />
                <input
                type="text"
                placeholder="Home Latitude"
                onChange={e => setHomeLat(e.target.value)}
                />
                <input
                type="text"
                placeholder="Home Longitude"
                onChange={e => setHomeLong(e.target.value)}
                />
                <button type="button" onClick={addUser}>
                    submit
                </button>
            </div>
        </div>   
    );

}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AddUser);


