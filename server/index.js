import express from 'express'
import mongoose from "mongoose"
import routes from "./router/routes";

mongoose.connect("mongodb://localhost:27017/node_learn", {useNewUrlParser: true})
    .then(() => {
        const app = express()
        app.use(express.json())
        app.use("/api", routes)
        // routes(app)
        const PORT = 5000
        app.listen(PORT, () => {
            console.log(`Server started at http://localhost:` + PORT)
        })
    })
