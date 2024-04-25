import React, { useContext, useState, useEffect, Fragment } from 'react';
import { FirebaseContext } from '../Firebase';
import { AuthUserContext, withAuthorization } from '../Session';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, Calendar, useStaticState } from "@material-ui/pickers";
import enLocale from "date-fns/locale/en-US";
import './addtrip.css';
import { Paper } from '@material-ui/core';
import { DatePicker } from "@material-ui/pickers";
import { KeyboardDatePicker } from "@material-ui/pickers"





function AddTrip() {
    const[starting, setStarting] = useState("");
    const[destination, setDestination] = useState("");
    const[distance, setDistance] = useState("");
    const[weather, setWeather] = useState("");
    const[start_date, setStartDate] = useState(new Date());
    const[end_date, setEndDate] = useState(new Date());
    const[vehicle_id, setVehicleId] = useState("");
    const[success, setSuccess] = useState(true)



    const[vehicles, setVehicles] = useState([]);

    const handleDateChange = (date) => {
        console.log(date);
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        console.log(date);
        setEndDate(date);
    };


    const useStyles = makeStyles((theme) => ({
        root: {
          '& .MuiTextField-root': {
            margin: theme.spacing(1),
            marginLeft: theme.spacing(40),
            width: '60ch',
            padding: theme.spacing('40px'),
            
          },
        },
      }));

  

    
    
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
    };


    
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
    
        <div className="container4">
            <div className="example-parent">
            <div>
                <h2 clasName="heading">Add a New Trip</h2>
                <div id="rcorners12">
                    <form>
                        <div>
                            <TextField id="outlined-multiline-flexible"
                            multiline
                            rowsMax={4}
                            value={starting}
                            variant="outlined"
                            type="text" 
                            label="Starting" 
                            onChange={e => setStarting(e.target.value)}>
                            
                            </TextField>
                            <TextField
                                id="outlined-multiline-flexible"
                                multiline
                                rowsMax={4}
                                style={{ marginLeft: 14 }}
                                value={destination}
                                variant="outlined"
                                type="text" 
                                label="Destination" 
                                onChange={e => setDestination(e.target.value)}>
                            </TextField>
                            <TextField
                                id="outlined-multiline-flexible"
                                multiline
                                rowsMax={4}
                                style={{ marginLeft: 14 }}
                            
                                value={distance}
                                variant="outlined"
                                type="text" 
                                label="Distance" 
                                onChange={e => setDistance(e.target.value)}>
                            </TextField>
                            <TextField
                                id="outlined-multiline-flexible"
                                multiline
                                rowsMax={4}
                                style={{ marginLeft: 14 }}
                                value={weather}
                                variant="outlined"
                                type="text" 
                                label="Weather" 
                                onChange={e => setWeather(e.target.value)}>
                            </TextField>
                        </div>
                        <div> 
                            
                            <div className="calendar">
                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enLocale}>
                                    <KeyboardDatePicker
                                    id="outlined-multiline-flexible"
                                    multiline
                                    rowsMax={4}
                                    label="Start Date"
                                    variant="outlined"
                                    value={start_date}
                                    onChange={handleDateChange}/>
                                </MuiPickersUtilsProvider>
                            </div>
                            <div className="calendar1">
                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enLocale}>
                                    <KeyboardDatePicker
                                    id="outlined-multiline-flexible"
                                    multiline
                                    rowsMax={4}
                                    label="End Date"
                                    variant="outlined"
                                    value={end_date}
                                    onChange={handleEndDateChange}/>
                                </MuiPickersUtilsProvider>
                            </div>
                            <div>
                                <select>
                                id="outlined-multiline-flexible"
                                multiline
                                rowsMax={4}
                                value={vehicle_id}
                                variant="outlined"
                                
                                type="text" 
                                label="Vehicle" 
                                value={vehicles[0] && vehicles[0][0]}
                                onChange={e => (e.target.value)}
                                    {vehicles.map(v => <option value={v[0]}>{v[1].make}&nbsp;{v[1].model}</option>)}
                                </select>
                            </div>
                            <div>
                                <Button style={{ marginLeft: 16 }} variant="outlined" type="button" onClick={addTrip}>
                                    submit
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            </div>

        </div>


    );

}


const condition = authUser => !!authUser;


export default withAuthorization(condition)(AddTrip);


