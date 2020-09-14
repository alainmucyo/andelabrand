import express from 'express'
import mongoose from "mongoose"
import routes from "./router/query.routes";

mongoose.connect(`${process.env.DB_CONNECTION_URL}/${process.env.DB_DATABASE}`, {useNewUrlParser: true})
    .then(() => {
        const app = express()
        app.use(express.json())
        app.use("/api", routes)
        app.listen(process.env.APP_PORT, () => {
            console.log(`Server started at ${process.env.APP_URL}:${process.env.APP_PORT}`)
        })
    })