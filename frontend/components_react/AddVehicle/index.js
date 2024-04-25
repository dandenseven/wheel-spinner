import React, { useContext, useState, useEffect } from 'react';
import { FirebaseContext } from '../Firebase';
import { AuthUserContext, withAuthorization } from '../Session';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, Calendar, useStaticState } from "@material-ui/pickers";
import enLocale from "date-fns/locale/en-US";
import { KeyboardDatePicker } from "@material-ui/pickers";
import blue from '@material-ui/core/colors/blue';
import './addvehicle.css';


function AddVehicle() {
    const[make, setMake] = useState("");
    const[model, setModel] = useState("");
    const[vehicle_miles, setVehicleMiles] = useState("");
    const[tire_miles, setTireMiles] = useState("");
    const[tire_purchase_date, setTirePurchaseDate] = useState(new Date());
    const[rotation_miles, setRotationMiles] = useState("");
    const[warranty_miles, setWarrantyMiles] = useState("");
    const[color, setColor] = useState("");
    const[vehicle_id, setVehicleId] = useState("");

    const[sucess, setSuccess] = useState(true);

    
    const handleDateChange = (date) => {
        console.log(date);
        setTirePurchaseDate(date);
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


    // need user id
    const userId = useContext(FirebaseContext).auth.currentUser.uid
    
    async function addVehicle() {
        const body = JSON.stringify({
            make: make,
            model: model,
            vehicle_miles: vehicle_miles,
            tire_miles: tire_miles,
            tire_purchase_date: new Date(tire_purchase_date).getTime(),
            rotation_miles: rotation_miles,
            warranty_miles: warranty_miles,
            color: color,
            user_id: userId,
            vehicle_id: vehicle_id
            
    
        })
        console.log(body)
        const configs = {
            method: 'post',
            body: body,
            headers: {"Content-Type": "application/json"}
        }
        const response = await fetch("http://localhost:5000/api/vehicle_add", configs);
        const success = await response.json();
        setSuccess(success.status);

    }

    return (
        

        <div className="container5">
            <div className="example-parent">
            
                <div>
                    <h2 className="heading1">Add a New Vehicle</h2>
                    <div id="rcorners13">
                        <form>
                            <div>
                                <TextField id="outlined-multiline-flexible"
                                    multiline
                                    rowsMax={4}
                                    value={make}
                                    variant="outlined"
                                    type="text" 
                                    label="Make" 
                                    onChange={e => setMake(e.target.value)}>
                                </TextField>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    multiline
                                    rowsMax={4}
                                    style={{ marginLeft: 14 }}
                                    value={model}
                                    variant="outlined"
                                    type="text" 
                                    label="Model" 
                                    onChange={e => setModel(e.target.value)}>
                                </TextField>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    multiline
                                    rowsMax={4}
                                    style={{ marginLeft: 14 }}
                                    value={vehicle_miles}
                                    variant="outlined"
                                    type="text" 
                                    label="Vehicle Miles"
                                    onChange={e => setVehicleMiles(e.target.value)}>
                                </TextField>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    multiline
                                    rowsMax={4}
                                    style={{ marginLeft: 14 }}
                                    value={tire_miles}
                                    variant="outlined"
                                    type="text" 
                                    label="Tire Miles" 
                                    onChange={e => setTireMiles(e.target.value)}>
                                </TextField>
                            </div>
                            <div>

                                <div className="calendar2">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enLocale}>
                                        <KeyboardDatePicker
                                        id="outlined-multiline-flexible"
                                        multiline
                                        rowsMax={4}
                                        label="Tire Purchase Date"
                                        variant="outlined"
                                        value={tire_purchase_date}
                                        onChange={handleDateChange}/>
                                    </MuiPickersUtilsProvider>
                                </div>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    multiline
                                    rowsMax={4}
                                    style={{ marginLeft: 14 }}
                                    value={rotation_miles}
                                    variant="outlined"
                                    type="text" 
                                    label="Tire Rotation Miles"
                                    onChange={e => setRotationMiles(e.target.value)}>
                                </TextField>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    multiline
                                    rowsMax={4}
                                    style={{ marginLeft: 14 }}
                                    value={warranty_miles}
                                    variant="outlined"
                                    type="text" 
                                    label="Tire Warranty Miles"
                                    onChange={e => setWarrantyMiles(e.target.value)}>
                                </TextField>
                                    
                                <TextField
                                    id="outlined-multiline-flexible"
                                    multiline
                                    rowsMax={4}
                                    style={{ marginLeft: 14 }}
                                    value={color}
                                    variant="outlined"
                                    type="text"
                                    label="Color" 
                                    onChange={e => setColor(e.target.value)}>
                                </TextField>
                                <div>
                                    <Button style={{ marginLeft: 16 }} variant="outlined" type="button" onClick={addVehicle}>
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


export default withAuthorization(condition)(AddVehicle);


