import {queryTest} from "./query/query.test";
import {articleTest} from "./article/article.test";
import {loginTest} from "./login/login.test";
import User from "../src/models/User";
import chai, {expect} from "chai";
import app from "../src";

describe("My brand: ", () => {
    describe("Auth: ",loginTest)
    describe("Query: ", queryTest)
    describe("Articles: ", articleTest)
    describe("Documentation",()=>{
        it("It should show documentation.", done => {
            chai.request(app)
                .get("/api-docs")
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    done()
                })
        })
    })
    describe("Delete user", ()=>{

        User.collection.remove()
    })
})