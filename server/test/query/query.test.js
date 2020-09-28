import chai from "chai"
import {expect} from "chai";

const chaiHttp = require("chai-http")
import app from "../../index"
import {queries} from "./query.data";
import {generateToken} from "../../utils/passport";

chai.use(chaiHttp)
const route = "/api/query"
const token = generateToken({name: "Alain", email: "Alain MUCYO", _id: 123445})
export const queryTest = () => {
    it("It should not list queries without token.", done => {
        chai.request(app)
            .get(route)
            .end((err, res) => {
                expect(res).to.have.status(401)
                done()
            })
    })
    it("It should not create article with no data", done => {
        chai.request(app)
            .post(route)
            .end((err, res) => {
                expect(res).to.have.status(422)
                done()
            })
    })
    it("It should not create article with invalid data", done => {
        chai.request(app)
            .post(route)
            .send(queries.invalid)
            .end((err, res) => {
                expect(res).to.have.status(422)
                done()
            })
    })
    it("It should create article with valid data", done => {
        chai.request(app)
            .post(route)
            .send(queries.valid)
            .end((err, res) => {
                expect(res).to.have.status(201)
                done()
            })
    })
    it("It should list queries when token provided.", done => {
        chai.request(app)
            .get(route)
            .set("Authorization","Bearer "+token)
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })
}