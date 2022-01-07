import AuthDAO from "../dao/authDAO.js"

export default class AuthCtrl {
    static async apiRegisterUser(req, res, next) {
        const registerResponse = await AuthDAO.registerUser()

        var { error } = registerResponse
        if (error) {
            res.status(400).json({ error: error.message })
        } else {
            res.json({ status: "register success" })
        }
    }

    static async apiLoginUser(req, res, next) {
        const loginResponse = await AuthDAO.loginUser()
        res.json({ status: "login success" })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}