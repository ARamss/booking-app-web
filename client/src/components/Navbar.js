import React from 'react';

 const NavBar = ()=>{
    return(
      <nav>
        <div className="nav-wrapper black">
        <a href="#" class="brand-logo">Logo</a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li><a href="/">Home</a></li>
            <li><a href="/signin">Sign In</a></li>
            <li><a href="/signup">Sign Up</a></li>
            <li><a href="/agendar-cita">Reservar</a></li>
            </ul>
        </div>
      </nav>
    )
 }

 export default NavBar
