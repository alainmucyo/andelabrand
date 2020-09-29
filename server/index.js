import express from 'express'
import mongoose from "mongoose"
import queryRoutes from "./router/query.routes";
import articleRoutes from "./router/article.routes";
import commentRoutes from "./router/comment.routes";
import authRoutes from "./router/auth.routes";
import adminRoutes from "./router/admin.routes";
import {upload} from "./utils/file-uploader";
import passport from "passport"
import {jwtStrategy} from "./config/passport";
import swaggerJsDoc from "swagger-jsdoc";
import {serve, setup} from "swagger-ui-express";
import {swaggerOptions} from "./config/swagger";

const swaggerDocument = require('./swagger.json');
const port = process.env.APP_PORT || 5000
const app = express()
// const database = process.env.DB_TEST_DATABASE
const database = process.env.APP_ENV == "test" ? process.env.DB_TEST_DATABASE : process.env.DB_DATABASE
const swaggerDocs = swaggerJsDoc(swaggerOptions);
mongoose.connect(`${process.env.DB_CONNECTION_URL}/${database}`, {useNewUrlParser: true})
    .then(() => {
        app.use(express.json())
        app.use(upload.single("image"))
        app.use("/api/query", queryRoutes)
        app.use("/api/article", articleRoutes)
        app.use("/api/comment", commentRoutes)
        app.use("/api/auth", authRoutes)
        app.use("/api/admin", adminRoutes)

        app.use(express.static('storage'))
        app.use(express.static('public'))
        passport.use(jwtStrategy)
        app.use("/api-docs", serve, setup(swaggerDocument));
        app.use(passport.initialize());

        app.listen(port, () => {
            console.log(`Server started at ${process.env.APP_URL}:${port}`)
        })
    })
export default app