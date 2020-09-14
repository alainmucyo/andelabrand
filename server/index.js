import express from 'express'
import mongoose from "mongoose"
import queryRoutes from "./router/query.routes";
import articleRoutes from "./router/article.routes";
import {upload} from "./utils/file-uploader";

const port = process.env.APP_PORT ? process.env.APP_PORT : 5000

mongoose.connect(`${process.env.DB_CONNECTION_URL}/${process.env.DB_DATABASE}`, {useNewUrlParser: true})
    .then(() => {
        const app = express()
        app.use(express.json())
        app.use(upload.single("image"))
        app.use("/api/query", queryRoutes)
        app.use("/api/article", articleRoutes)
        app.use(express.static('storage'))
        app.listen(port, () => {
            console.log(`Server started at ${process.env.APP_URL}:${port}`)
        })
    })