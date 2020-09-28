import {queryTest} from "./query/query.test";
import {articleTest} from "./article/article.test";
import {loginTest} from "./login/login.test";
import User from "../models/User";

describe("My brand: ", () => {
    describe("Auth: ",loginTest)
    describe("Query: ", queryTest)
    describe("Articles: ", articleTest)
    describe("Delete user", ()=>{
        User.collection.remove()
    })
})