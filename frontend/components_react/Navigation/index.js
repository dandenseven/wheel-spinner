import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import '../../Css/Layout/Navigation.css';
import { Button } from '@material-ui/core';
import { withFirebase } from '../Firebase';

const Navigation = ({ firebase }) => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth firebase={firebase} /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>



);

const NavigationAuth = ({ firebase }) => (


  <div className="example-parent">
    <div className="container">
      <input data-function="swipe" id="swipe" type="checkbox"></input>
      <label data-function="swipe" for="swipe">&#xf057;</label>
      <label data-function="swipe" for="swipe">&#xf0c9;</label>

      {/* Landing, Trips, Weather and AddUser pages will be adding back into application */}

      <div className="sidebar">
        <nav className="menu">

          <ul>
            {/* <li>
                <Link to={ROUTES.LANDING}>Landing</Link>
              </li> */}
            <li>
              <Link class="active" to={ROUTES.HOME}>Home</Link>
            </li>
            <li>
              <Link to={ROUTES.ACCOUNT}>Account</Link>
            </li>
            <li>
              <Link to={ROUTES.VEHICLE}>Vehicles</Link>
            </li>
            {/* <li>
                <Link to={ROUTES.TRIPS}>Trips</Link>
              </li> */}
            {/* <li>
                <Link to={ROUTES.WEATHER}>Weather</Link>
              </li> */}
            <li>
              <Link to={ROUTES.ADDTRIP}>AddTrip</Link>
            </li>
            <li>
              <Link to={ROUTES.ADDVEHICLE}>AddVehicle</Link>
            </li>
            {/* <li>
                <Link to={ROUTES.ADDUSER}>AddUser</Link>
              </li> */}
            <li><Button variant="container" primary="color"
              SignOutButton onClick={firebase.doSignOut}>Sign out</Button>
            </li>
          </ul>
        </nav>
      </div>


    </div>
  </div>

);

const NavigationNonAuth = () => (
  <ul>
    {/* <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
        </li> */}
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);
export default withFirebase(Navigation);