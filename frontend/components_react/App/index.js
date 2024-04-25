import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../../Sass/App.scss';
// import { withFirebase } from '../Firebase';
import Navigation from '../Navigation';
// import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import TireMainPage from '../Vehicle';
// import TripsPage from '../Trips';
// import WeatherPage from '../Weather';
import AddTrip from '../AddTrip';
import AddVehicle from '../AddVehicle';
// import AddUser from '../AddUser';


import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';


const App = () => (
    <Router>
        <div>
            <Navigation />

            <hr />

            {/* <Route exact path={ROUTES.LANDING} component={LandingPage} /> */}
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
            <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
            <Route path={ROUTES.VEHICLE} component={TireMainPage} />
            {/* <Route path={ROUTES.TRIPS} component={TripsPage} /> */}
            {/* <Route path={ROUTES.WEATHER} component={WeatherPage} /> */}
            <Route path={ROUTES.ADDTRIP} component={AddTrip} />
            <Route path={ROUTES.ADDVEHICLE} component={AddVehicle} />
            {/* <Route path={ROUTES.ADDUSER} component={AddUser} /> */}
        </div>
    </Router>

            
);


export default withAuthentication(App);
