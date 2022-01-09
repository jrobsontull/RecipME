import bcrypt from "bcryptjs"

let users

function User (id, name, email) {
    this._id = id
    this.name = name,
    this.email = email,
    this.token = null
}

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
            // Check user credentials
            const userFound = await users.findOne({ "email": email })
            if (!userFound) return { error: "An account with this email does not exist." }
            const validPass = await bcrypt.compare(pass, userFound.password)
            if (!validPass) return { error: "Invalid password." }
            return new User(userFound._id, userFound.name, userFound.email)
        } catch (e) {
            console.log("Failed to login: " + e)
            return { error: e }
        }
    }

    static async registerUser(name, email, pass) {
        try {
            // Check if user email already exists
            const emailExists = await users.findOne({ "email": email })
            if (emailExists) return { error: "User with this email already exists." }

            // Hashing
            const salt = await bcrypt.genSalt(10)
            const hashedPass = await bcrypt.hash(pass, salt)

            // Register user
            const registerResonse = await users.insertOne({
                "name": name,
                "email": email,
                "password": hashedPass,
                "date": new Date()
            })
            return new User(registerResonse.insertedId, name, email)
        } catch (e) {
            console.log("Failed to register: " + e)
            return { error: e }
        }
    }
}