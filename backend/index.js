import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import RecipiesDAO from "./dao/recipesDAO.js"

dotenv.config()
const MongoClient = mongodb.MongoClient
const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.RESTRECIPES_DB_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    }
).catch(err => {
    console.log("Database connection error")
    console.error(err.stack)
    process.exit(1)
}).then(async client => {

    await RecipiesDAO.injectDB(client)

    app.listen(port, () => {
        console.log('Listening on port ' + port)
    })
})