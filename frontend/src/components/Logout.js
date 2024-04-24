import React from  'react';


function Logout() {
    
    
    
    !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

    
    const logoutUser = firebase.auth().Logout()
        console.log(logoutUser)


    return (
        <div>
            <button >Logout</button>
        </div>
    )
}

export default Logout; 