import React, { useContext, useState, useEffect, useRef } from 'react';
import { FirebaseContext } from '../Firebase';
import { AuthUserContext, withAuthorization } from '../Session';
import '../../Sass/Components/Rcorners.scss';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



function TripsPage() {
    const [trips, setTrips] = useState([]);
    const [directions, setDirections] = useState([]);
    const [maps, setMaps] = useState([])

    const userId = useContext(FirebaseContext).auth.currentUser.uid

    async function getTrips() {
        const configs = {
            method: 'post',
            body: JSON.stringify({ "user_id": userId }),
            headers: { "Content-Type": "application/json" }
        }
        const response = await fetch("http://localhost:5000/api/users_trip", configs);
        const userTrips = await response.json();
        console.log(userTrips)
        setTrips(userTrips);
    }




    // Additional features to be added to application


    // const googleMap = ({ placeName }) => {
    //     const googlemapRef = useRef();
    //     let googleMap;
    //     useEffect(() => {
    //         const googleMapScript = document.createElement('script');
    //         googleMapScript.src=`https://maps.googleapis.com/maps/api/js?key=${process.env.$apiKey3}&libraries=places`;
    //         googleMapScript.async = true;
    //         window.document.body.appendChild(googleMapScript);
    //         googleMapScript.addEventListener('load', () => {
    //             getLatLng();
    //         })
    //     },[]);

    //     const createGoogleMap = (coordinates) => {
    //         googleMap = new window.google.maps.Map(google.MapRef.current, {
    //             zoom: 16,
    //             center: {
    //                 lat: coordinates.lat(),
    //                 lng: coordinates.lng(),
    //             },
    //             disableDefaultUI: true,
    //         })
    //     };
    //     const getLatLng = () => {
    //         let lat, lng, placeId;
    //         new window.google.maps.Geocoder().geocode(
    //             { address: `${placeName}` },
    //             function (results, status) {
    //                 if (status === window.google.maps.GeocoderStatus.OK)
    //                     placeId = results[0].place_id;
    //                     createGoogleMap(results[0].geometry.location);
    //                     lat = results[0].geometry.location.lat();
    //                     lng = results[0].geometry.location.lng();
    //                     new window.google.maps.Marker({
    //                         position: { lat, lng },
    //                         map: googleMap,
    //                         animation: window.google.maps.Animation.DROP,
    //                         title: `${placeName}`,
    //                     });
    //                 },  

    //                 // else({"Geocode was not successful for the following reasons: status": }setTrips

    //                 );
    //             }

    //     };


    async function getDirections() {
        const configs = {
            mode: 'no cors',
            headers: { "Content-Type": "application/json" }
        }
        const response = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=1235+Prospect+Ave+Brooklyn?destinations=12+Main+Street+Maplewood+NJ?departure_time=1622557978157?mode=transit?key=apiKey2`);

        const userDirections = await response.json();
        console.log(userDirections)
        setDirections(userDirections);

    }



    useEffect(() => getTrips(), []);
    // const test = trips.map(t => <p></p>)

    useEffect(() => getDirections(), []);



    return (


        <div className="container3">

            {/* <label for="input">Starting Address:</label>
            <input type="text" id="input" name="input"></input>
            <label for="input">Trip Destination:</label>
            <input type="text" id="input" name="input"></input> */}
            {/* {trips} */}




            <p>inputs for trip start destination and end destination</p>
            <p>Trip history</p>
            <p>Map</p>


            <div className="example-parent">
                {trips.map(trip =>
                    <div>
                        <div className="root">
                            <CardMedia
                                className="media">
                            </CardMedia>
                            <table>
                                <p id={"rcorners1"}><tr>
                                    <th>Starting route:</th>
                                    <th>{trip.starting}</th><bk></bk>
                                </tr><bk></bk>
                                    <tr>
                                        <th>Destination:</th>
                                        <td>{trip.destination}</td>
                                    </tr><bk></bk>
                                    <tr>
                                        <th>Distance:</th>
                                        <td>{trip.distance}</td>
                                    </tr><bk></bk>
                                    <tr>
                                        <th>Weather:</th>
                                        <td>{trip.weather}</td>
                                    </tr><bk></bk>
                                    <tr></tr>
                                    <tr>
                                        <th>Start date:</th>
                                        <td>{trip.start_date}</td>
                                    </tr><bk></bk>
                                    <tr>
                                        <th>End date:</th>
                                        <td>{trip.end_date}</td>
                                    </tr><bk></bk>

                                </p>
                            </table>
                        </div>
                    </div>)}
            </div>
        </div>

    );


}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(TripsPage);
