import React from  'react';
import {Link} from "react-router-dom";

export default function NavBar() {
    return(
        <nav>
            <Link style={{color:"orange"}} to="/Login">Login</Link>
            <Link style={{color:"orange"}} to="/Signup">Signup</Link>
            <Link style={{color:"orange"}} to="/Logout">Logout</Link>
            <Link style={{color:"orange"}} to="/TireMain">TireMain</Link>
            <Link style={{color:"orange"}} to="/trips">Trips</Link>
            <Link style={{color:"orange"}} to="/Weather">Weather</Link>
        </nav>

//         <div class="navbar">
//             <a href="#Login">Login</a>
//             <a href="#news">News</a>
//             <div class="dropdown">
//                 <button class="dropbtn">Dropdown
//                     <i class="fa fa-caret-down"></i>
//                 </button>
//             <div class="dropdown-content">
//                 <a href="#"><Link style={{color:"orange"}} to="/Signup">Signup</Link></a>
//                 <a href="#"><Link style={{color:"orange"}} to="/Logout">Logout</Link></a>
//                 <a href="#"><Link style={{color:"orange"}} to="/TireMain">TireMain</Link></a>
//                 <a href="#"><Link style={{color:"orange"}} to="/trips">Trips</Link></a>
//                 <a href="#"><Link style={{color:"orange"}} to="/Weather">Weather</Link></a>
//         </div>
//     </div>
// </div>
    )
}

