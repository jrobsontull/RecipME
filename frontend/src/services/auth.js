import axios from "axios";

class Auth {
    constructor() {
        this.authenticated = false;
    }

    isAuthenticated() {
        return this.authenticated;
    }

    async verifyToken() {
        const user = localStorage.getItem('user');
        const token = JSON.parse(user).token
        
        try {
            const header = {
                headers: {
                    "Content-type": "application/json",
                }
            };

            const payload = {
                "token": token,
            };

            const response = await axios.post('http://localhost:5000/api/v1/user/verify',
                payload,
                header
            );

            if (response.status === 200) {
                console.log('Identity confirmed. Server response: ' + response.data.identity);
                this.authenticated = true;
                return true;
            } else {
                return false;
            }
        } catch (e) {
            console.log('Error: ' + e);
            return false;
        }
    }
}

export default Auth;