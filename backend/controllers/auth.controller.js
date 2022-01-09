import AuthDAO from "../dao/authDAO.js"
import generateToken from "../utils/generateToken.js"

export default class AuthCtrl {
    static async apiRegisterUser(req, res, next) {
        const registerResponse = await AuthDAO.registerUser(
            req.body.name,
            req.body.email,
            req.body.password
        )
        
        // Error handling
        var { error } = registerResponse
        if (error) {
            res.status(400).json({ error })
        } else {
            const user = registerResponse
            user.token = generateToken(registerResponse._id)
            res.status(201).json(user)
        }
    } catch (e) {
        res.status(500).json({ error: e.message })
    }

    static async apiLoginUser(req, res, next) {
        const loginResponse = await AuthDAO.loginUser(
            req.body.email,
            req.body.password
        )
        // Error handling
        var { error } = loginResponse
        if (error) {
            res.status(400).json({ error })
        } else {
            // Create and sign token
            const user = loginResponse
            user.token = generateToken(loginResponse._id)
            res.json(user)
        }
    } catch (e) {
        res.status(500).json({ error: e.message })
    }

    static async apiUpdateSettings() {

    }

    static async deleteUser() {

    }
}