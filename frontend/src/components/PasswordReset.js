import firebase from 'Firebase';
import 'firebase/auth';
import { useState } from 'react';

export default function PasswordReset ({ resetPassword }) {
    const [resetPasswordEmail, setResetPasswordEmail] = useState("");

    function resetPasswordChangHandler(e) {
        setResetPasswordEmail(e.target.value)
    }

    const sendLogin = async () => {
        const userData = JSON.stringify({
            email: resetPasswordEmail 

        })

        const config = {
            method: "POST",
            headers: {"Content_Type": "application/json"},
            body: userData
        }

    
    }
}
