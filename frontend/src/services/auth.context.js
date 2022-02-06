
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

function AuthProvider({children}) {
    const [user, setUser] = useState({
        "user": null,
        "verified": false,
        "isVerifying": false
    });

    async function authUser() {
        const userLocal = localStorage.getItem('user');
        if (userLocal) {
            console.log('Checking user...');
            const userLocalJSON = JSON.parse(userLocal);
            const verifyResponse = await verifyToken(userLocalJSON);

            if (verifyResponse) {
                setUser({"user": userLocalJSON, "verified": true, "isVerifying": false});
            } else {
                setUser({"user": userLocalJSON, "verified": false, "isVerifying": false});
            }
        }
    }

    //useEffect(() => {
    //    console.log('Is verifying: ' + user.isVerifying);
    //}, [user])

    async function verifyToken(userJSON) {
        try {
            setUser({"user": null, "verified": false, "isVerifying": true});
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <AuthContext.Provider value={{user, authUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
export { AuthProvider };