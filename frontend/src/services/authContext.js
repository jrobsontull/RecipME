
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

function AuthProvider({children}) {
    const [user, setUser] = useState({
        "user": null,
        "verified": false
    });

    async function authUser() {
        const userLocal = localStorage.getItem('user');
        if (userLocal) {
            console.log('Setting new user...');
            const userLocalJSON = JSON.parse(userLocal);
            const verifyResponse = await verifyToken(userLocalJSON);

            if (verifyResponse) {
                setUser({"user": userLocalJSON, "verified": true});
            } else {
                setUser({"user": userLocalJSON, "verified": false});
            }
        }
    }

    async function verifyToken(userJSON) {
        try {
            const header = {
                headers: {
                    "Content-type": "application/json",
                }
            };

            const payload = {
                "token": userJSON.token,
            };

            const response = await axios.post('http://localhost:5000/api/v1/user/verify',
                payload,
                header
            );

            if (response.status === 200) {
                console.log('Identity confirmed. Server response: ' + response.data.identity);
                return true;
            } else {
                return false;
            }
        } catch (e) {
            console.log('Error: ' + e);
            return false;
        }
    }

    useEffect(() => {
        authUser();
    }, [])

    return (
        <AuthContext.Provider value={user, authUser}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
export { AuthProvider };