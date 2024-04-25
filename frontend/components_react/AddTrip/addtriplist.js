import React, { useContext, useState, useEffect } from 'react';
import { FirebaseContext } from '../Firebase';
import { AuthUserContext, withAuthorization } from '../Session';


function AddTrip() {
    const[starting, setStarting] = useState("");
    const[destination, setDestination] = useState("");
    const[distance, setDistance] = useState("");
    const[weather, setWeather] = useState("");
    const[start_date, setStartDate] = useState("");
    const[end_date, setEndDate] = useState("")
    const[vehicle_id, setVehicleId] = useState("");
    const[success, setSuccess] = useState(true)



    const[vehicles, setVehicles] = useState([]);
    
    const userId = useContext(FirebaseContext).auth.currentUser.uid

    async function getVehicles() {
        console.log(userId)
        const configs = {
            method: 'post',
            body: JSON.stringify({"user_id": userId}),
            headers: {"Content-Type": "application/json"}
        }
        const response = await fetch("http://localhost:5000/api/users_vehicle", configs);
        const userVehicles = await response.json();
        console.log(userVehicles)
        setVehicles(userVehicles)
        setVehicleId(userVehicles[0][0]);
    }


    
    async function addTrip() {
        const body = JSON.stringify({
            starting: starting, 
            destination: destination,
            distance: distance,
            weather: weather,
            start_date: new Date(start_date).getTime(),
            end_date: new Date(end_date).getTime(),
            vehicle_id: vehicle_id,
            user_id: userId
            
        })
        const configs = {
            method: 'post',
            body: body,
            headers: {"Content-Type": "application/json"}
        }
        const response = await fetch("http://localhost:5000/api/trip_add", configs);
        const success = await response.json();
        setSuccess(success.status);

    }


    useEffect (() => getVehicles(), []);

    return (
        
        <div>
            <h2>Add a New Trip</h2>
            <input 
            type="text" 
            placeholder="Starting" 
            onChange={e => setStarting(e.target.value)}
            />
            <input 
            type="text" 
            placeholder="Destination" 
            onChange={e => setDestination(e.target.value)}
            />
            <input 
            type="text" 
            placeholder="Distance" 
            onChange={e => setDistance(e.target.value)}
            />
            <input 
            type="text" 
            placeholder="Weather" 
            onChange={e => setWeather(e.target.value)}
            />
            <input 
            type="date" 
            placeholder="Start Date" 
            onChange={e => setStartDate(e.target.value)}
            />
            <input 
            type="date" 
            placeholder="End Date" 
            onChange={e => setEndDate(e.target.value)}
            />
            <select value={vehicles[0] && vehicles[0][0]}
            onChange={e => setVehicleId(e.target.value)}>
                {vehicles.map(v => <option value={v[0]}>{v[1].make} {v[0]}</option>)}
            </select>
 
            <button type="button" onClick={addTrip}>
                submit
            </button>
        </div>

        


    );

}


const condition = authUser => !!authUser;


export default withAuthorization(condition)(AddTrip);


