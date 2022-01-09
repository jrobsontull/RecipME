import React, { useState } from "react";
import axios from "axios";

class auth {
    constructor() {
        this.authenticated = false;
    }

    login(callback) {
        this.authenticated = true;
        callback()
    }

    logout(callback) {
        this.authenticated = false;
        callback()
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

async function verifyToken(token) {
    const header = {
      headers: {
          "Content-type": "application/json",
      }
    }
    const payload = {
      "token": token,
    }

    const response = await axios.post('http://localhost:5000/api/v1/user/verify',
      payload,
      header
    );

    return response.data
}

export default auth;