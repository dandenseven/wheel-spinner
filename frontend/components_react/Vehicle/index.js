import React, { useContext, useState, useEffect } from 'react';
import { FirebaseContext } from '../Firebase';
import { AuthUserContext, withAuthorization } from '../Session';
import '../../Sass/Components/Rcorners.scss';
import './vehicle.css';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



function TireMainPage() {
    const[vehicles, setVehicles] = useState([]);
    
    // need user id
    const userId = useContext(FirebaseContext).auth.currentUser.uid


    function showDate(date) {
        const originalDate = new Date(date)
        const options = {
            year:"numeric",month:"long",day:"numeric"

        }
        return new Intl.DateTimeFormat("en-US",options).format(date)
    };


    
    async function getVehicles() {
        const configs = {
            method: 'post',
            body: JSON.stringify({"user_id": userId}),
            headers: {"Content-Type": "application/json"}
        }
        const response = await fetch("http://localhost:5000/api/users_vehicle", configs);
        const userVehicles = await response.json();
        console.log(userVehicles)
        setVehicles(userVehicles);

    }

    async function getReset(vehicle_id) {
        const configs = {
            method: 'post',
            body: JSON.stringify({"id": vehicle_id}),
            headers: {"Content-Type": "application/json"}
        }
        const response = await fetch("http://localhost:5000/api/update_vehicle", configs);
        const success = await response.json();
        getVehicles()
        console.log(success);
    }
    
    async function getResetRotation(vehicle_id) {
        const configs = {
            method: 'post',
            body: JSON.stringify({"id": vehicle_id}),
            headers: {"Content-Type": "application/json"}
        }
        const response = await fetch("http://localhost:5000/api/update_rotation", configs);
        const success =await response.json();
        getVehicles()
        console.log(success);
    }

    // useEffect to get data upon component loading
    useEffect (() => getVehicles(), []);

    // useEffect (() => getUpdateVehicles(), []);


 
    return (

        <div className="container2">
            <div>
                <h2 className="title">My Tires</h2>
                
                


            
                <div className="example-parent">
                    
                    {vehicles.map(vehicle => 
                            
                        <div id="rcorners5">
                                    <div>
                                 
                                    <h2>{vehicle[1].make}&nbsp;
                                    {vehicle[1].make}</h2>
                                    </div>
                                    <div>
                                    <th>Model:</th>
                                    <th>{vehicle[1].model}</th>
                                    </div>
                                    <div>
                                        <th>Vehicle miles:</th>
                                        <td>{vehicle[1].vehicle_miles}</td>
                                    </div>
                                    <div>
                                        <th>Tire miles:</th> <td>{vehicle[1].tire_miles}</td>
                                    </div>
                                    <div>
                                        <th>Tire purchased date:&nbsp;</th> 
                                        <td>{showDate(vehicle[1].tire_purchase_date)}</td>
                                    </div>
                                    <div>
                                        <th>Miles until rotation:</th> 
                                        <td>{vehicle[1].rotation_miles}</td>
                                    </div>
                                    <div>
                                        <th>Color:</th> 
                                        <td>{vehicle[1].color}</td>
                                    </div>
                                        
                                        
                                
                                <button onClick={e => getReset(vehicle[0])}>Tire Change</button>
                                <button onClick={e => getResetRotation(vehicle[0])}>Rotate Tires</button>
            
                        </div>
                        )}
                
                </div>
            
            </div>
        </div>

        

    );

}


const condition = authUser => !!authUser;


export default withAuthorization(condition)(TireMainPage);
