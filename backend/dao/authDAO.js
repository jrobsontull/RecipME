import mongodb from "mongodb"

let users

export default class AuthDAO {
    static async injectAuthDB(conn) {
        if (users) {
            return
        }
        try {
            users = await conn.db(process.env.RESTRECIPES_NS).collection("users")
        } catch(e) {
            console.error(
                'Unable to establish a connection handle in recipesDAO: ' + e,
            )
        }
    }

    static async loginUser(email, pass) {
        try {
            
        } catch (e) {
            console.log("Failed to register: " + e)
            return { error: e }
        }
    }

    static async registerUser(name, email, pass) {
        try {
            const registerResonse = await users.insertOne({
                "name": name,
                "email": email,
                "password": pass
            })
        } catch (e) {
            console.log("Failed to register: " + e)
            return { error: e }
        }
    }
}