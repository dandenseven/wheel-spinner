import React, { useContext, useState, useEffect, useLayoutEffect } from 'react';
import { FirebaseContext } from '../Firebase';
import './home.css';
import { AuthUserContext, withAuthorization } from '../Session';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
require('dotenv').config();



function HomePage() {
    const [vehicles, setVehicles] = useState([]);
    const [trips, setTrips] = useState([]);
    const [weather, setWeather] = useState({});

    const userId = useContext(FirebaseContext).auth.currentUser.uid

    const precip = weather.minutely && weather.minutely.reduce((a, b) => a + b.precipitation, 0)



    function showDate(date) {
        const originalDate = new Date(date)
        const options = {
            year: "numeric", month: "long", day: "numeric"

        }
        return new Intl.DateTimeFormat("en-US", options).format(date)
    };

    function showTime(date) {
        const originalDate = new Date(date)
        const options = {
            hour: "numeric", minute: "numeric"

        }
        return new Intl.DateTimeFormat("en-US", options).format(date)
    };


    function getWarning(mileage) {
        if (mileage >= 40000) {
            return (
                <div>
                    <th className="glow"><strong>YOU NEED TO SLOW DOWN TO 20mph YOUR TIRES ARE WORN!!</strong></th>
                    <th style={{ backgroundColor: "red" }}>Tire Miles: {mileage} </th>
                </div>
            )
        } else if (mileage >= 35000) {
            return (
                <div>
                    <th className="glow1">YOU MUST PROCEED WITH CAUTION IN INCLEMENT WEATHER - SLOW DOWN</th>

                    <th style={{ backgroundColor: "orange" }}>Tire Miles: {mileage} </th>
                </div>
            )
        } else
            return
        <div>
            <h3>IT'S RAINING DRIVE WITH CAUTION</h3>
        </div>


    };

    function getInches(valNum) {
        return valNum / 25.4

    };

    function getMiles(valNum) {
        return valNum / 5.28
    }


    // const datenew = vehicles.map(vehicle => vehicle[1].tire_purchasee

    // async function getVehicles() {
    //     console.log(userId)
    //     const configs = {
    //         method: 'post',
    //         body: JSON.stringify({"user_id": userId}),
    //         headers: {"Content-Type": "application/json"}
    //     }
    //     const response = await fetch("http://localhost:5000/api/users_vehicle", configs);
    //     const userVehicles = await response.json();
    //     console.log(userVehicles)
    //     setVehicles(userVehicles);
    // }


    // async function getTrips() {
    //     const configs = {
    //         method: 'post',
    //         body: JSON.stringify({"user_id": userId}),
    //         headers: {"Content-Type": "application/json"}
    //     }
    //     const response = await fetch("http://localhost:5000/api/users_trip", configs);
    //     const userTrips = await response.json();
    //     console.log(userTrips)
    //     setTrips(userTrips);
    // }


    async function getHome() {
        const configs = {
            method: 'post',
            body: JSON.stringify({ "user_id": userId }),
            headers: { "Content-Type": "application/json" }
        }
        const response = await fetch("http://localhost:5000/api/users_home", configs);
        const data = await response.json();
        console.log(data)
        setTrips(data.trips)
        setVehicles(data.vehicles);
    }

    async function getTireStatus() {
        const configs = {
            method: 'post',
            body: JSON.stringify({ "user_id": userId }),
            headers: { "Content-Type": "application/json" }
        }
        const response = await fetch("http://localhost:5000/api/update_tire_miles", configs);
        const data = await response.json();
        console.log(data)
        setTrips(data.trips)
        setVehicles(data.vehicles);
    }

    async function getRotationStatus() {
        const configs = {
            method: 'post',
            body: JSON.stringify({ "user_id": userId }),
            headers: { "Content-Type": "application/json" }

        }

        const response = await fetch("http://localhost:5000/api/update_rotation_miles", configs);
        const data = await response.json();
        console.log(data)
        setTrips(data.trips)
        setVehicles(data.vehicles);
    }




    async function getWeather() {


        const apiKey = `{process.env.REACT_APP_WEATHER_KEY}`
        console.log("API", apiKey)


        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=40.71&lon=-74.00&dt=2021518932&units=imperial&lang=en&appid={apiKey}`);


        const userWeather = await response.json();
        console.log(userWeather)
        setWeather(userWeather);


    }



    // useEffect (() => getVehicles(), []);

    // useEffect (() => getTrips(), []);

    useEffect(() => getWeather(), []);

    useEffect(() => getHome(), []);

    useEffect(() => getTireStatus(), []);

    useEffect(() => getRotationStatus(), []);


    return (
        <div className="container">
            <div>
                <h1 className="pageheader">Dashboard</h1>

                {/* <p>The Home Page is accessible by every signed in user.</p>
                        <p>show last vehicle used</p>
                            <p>show most recent trip</p>
                                <p>show current miles</p>
                                    <p>show weather snapshot</p>
                                        <p> show last login</p>
                                            <p>show tire status</p>
                                                <p>show tire rotation expected date</p>
                                                    <p>show oil change expected date</p> */}







                <h1>My Vehicles</h1>
                <div className="example-parent">


                    {vehicles.map(vehicle =>

                        <div id="rcorners7">
                            <div>

                                <h2>{vehicle[1].make}&nbsp;
                                    {vehicle[1].model}
                                </h2>
                            </div>
                            <div>
                                <th>Vehicle miles -&nbsp;{vehicle[1].vehicle_miles}</th>
                            </div>
                            <div>
                                <th>Tire miles -&nbsp;{vehicle[1].tire_miles}</th>
                            </div>
                            <div>
                                <th>Tire purchased date:&nbsp;</th>
                                <td>{showDate(vehicle[1].tire_purchase_date)}</td>
                            </div>
                            <div>
                                <th>Miles until rotation -&nbsp;</th>
                                <td>{vehicle[1].rotation_miles}</td>
                            </div>
                            <div>
                                <th>Color -&nbsp;</th>
                                <td>{vehicle[1].color}</td>
                            </div>
                            <div>
                                <th>Precipitation: &nbsp;</th>
                                <th>{(weather.daily && precip)}</th>
                            </div>
                            <div>

                                <th>Rain:</th>
                                <th>{weather.daily && (getInches(weather.daily[0].rain))}
                                </th>

                            </div>

                            <div>
                                <div id="rcorners3">
                                    <th>{weather.daily && precip > 0.5 && <p>Be careful out there</p>}</th>
                                    {getWarning(vehicle[1].tire_miles)}
                                </div>
                            </div>


                        </div>)}


                </div>





                <h1>My Trips</h1>
                <div className="example-parent">
                    {trips.map(trip =>

                        <div>
                            <div className="root">
                                <CardMedia
                                    className="media"><th> &nbsp;Place holder</th>
                                </CardMedia>
                                <div>
                                    <th>Starting route -&nbsp;</th>
                                    <td>{trip.starting}</td><bk></bk>
                                </div><bk></bk>
                                <div>
                                    <th>Destination -&nbsp;</th>
                                    <td>{trip.destination}</td>
                                </div><bk></bk>
                                <div>
                                    <th>Distance -&nbsp;</th>
                                    <td>{trip.distance}&nbsp;miles</td>
                                </div><bk></bk>
                                <div>
                                    <th>Weather -&nbsp;</th>
                                    <td>{trip.weather}</td>
                                </div><bk></bk>

                                <div>
                                    <th>Start date -&nbsp;</th>
                                    <td>{showDate(trip.start_date)}</td>
                                </div><bk></bk>
                                <div>
                                    <th>End date -&nbsp;</th>
                                    <td>{showDate(trip.end_date)}</td>
                                </div><bk></bk>
                            </div>
                        </div>
                    )}

                </div>






                <div className="example-parent">
                    <div className="forecast"><strong>7 Day Forecast</strong></div>

                    <div className="mychart3">
                        <div className="weatherforcast">

                            {weather.daily && weather.daily.slice(0, 7).map(d => (
                                <div>
                                    <img
                                        src={`https://openweathermap.org/img/w/${d.weather[0].icon}.png`}
                                        alt={d.weather[0].main}
                                    />
                                    <div>{d.temp.max.toFixed()}</div> - <div>{d.temp.min.toFixed()}</div>
                                </div>
                            ))}
                        </div>
                        <h4 className="degree">Fahrenheit</h4>
                        <Button size="large"
                            variant="contained"
                            backgroundColor="green"
                            className="currentweather">
                            <strong>Current Weather Conditions
                            </strong></Button>
                        <div> <Button
                            size="small"
                            variant="contained"
                            className="weatheroutlook">


                            <th>Weather Outlook -&nbsp;</th>
                            <th>{weather.daily && weather.current.weather[0].description}</th><bk></bk>
                        </Button>
                        </div>
                        <div className="weatherConditions">
                            <div id={"rcorners6"}>
                                <div>
                                    <th>Clouds:&nbsp;&nbsp;</th>
                                    <th>{weather.daily && weather.current.clouds}</th><bk></bk>
                                </div>
                                <div>
                                    <th>Temp:&nbsp;&nbsp;</th>
                                    <th>{weather.daily && weather.current.temp}&deg;</th><bk></bk>
                                </div>
                                <div>
                                    <th>Feels like:&nbsp;&nbsp;</th>
                                    <th>{weather.daily && weather.current.feels_like}&deg;</th><bk></bk>
                                </div>
                                <div>
                                    <th>Humidity:&nbsp;</th>
                                    <th>{weather.daily && weather.current.humidity}%</th><bk></bk>
                                </div>
                                <div>
                                    <th>Sunrise:&nbsp;&nbsp;</th>
                                    <th>{weather.daily && showTime(weather.current.sunrise)}</th>
                                </div>
                                <tr>
                                    <th>Sunset:&nbsp;&nbsp;</th>
                                    <th>{weather.daily && showTime(weather.current.sunset)}</th>
                                </tr>
                                <div>
                                    <th>UV Index:&nbsp;&nbsp;</th>
                                    <th>{weather.daily && weather.current.uvi}</th>
                                </div>
                                <div>
                                    <th>visibility:&nbsp;&nbsp;</th>
                                    <th>{weather.daily && getMiles(weather.current.visibility)}</th>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>




            </div>
        </div>

    );


}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);