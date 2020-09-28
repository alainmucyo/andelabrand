import chai from "chai"
import {expect} from "chai";

const chaiHttp = require("chai-http")
import app from "../../index"
import {users} from "./login.data";
import {generateToken} from "../../utils/passport";
import {mockUser} from "../mock-user.data";
import {articles} from "../article/article.data";

chai.use(chaiHttp)
const route = "/api/auth/login"
let token
export const loginTest = () => {
    it("It should not login with invalid data", done => {
        chai.request(app)
            .post(route)
            .send(users.invalid)
            .end((err, res) => {
                expect(res).to.have.status(422)
                done()
            })
    })
    it("It should mock user", done => {
        chai.request(app)
            .post("/api/auth/mock")
            .send({...users.valid, name: "Alain"})
            .end((err, res) => {
                token = generateToken(res.body)
                expect(res).to.have.status(201)
                done()
            })
    })
    it("It should login with valid data", done => {
        chai.request(app)
            .post(route)
            .send(users.valid)
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })
    it("It should show logged in user", done => {
        chai.request(app)
            .get("/api/auth/user")
            .set("Authorization", "Bearer " + token)
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })
    it("It should not update user profile without token", done => {
        chai.request(app)
            .put("/api/auth/profile")
            .send({name: "MUCYO"})
            .end((err, res) => {
                expect(res).to.have.status(401)
                done()
            })
    })
    it("It should not update user profile without enough data", done => {
        chai.request(app)
            .put("/api/auth/profile")
            .send({name: "MUCYO"})
            .set("Authorization", "Bearer " + token)
            .end((err, res) => {
                expect(res).to.have.status(422)
                done()
            })
    })
    it("It should not update user profile with wrong old password", done => {
        chai.request(app)
            .put("/api/auth/profile")
            .send({...users.valid, old_password: "aaa", password: "password"})
            .set("Authorization", "Bearer " + token)
            .end((err, res) => {
                expect(res).to.have.status(422)
                done()
            })
    })
    it("It should update user profile with valid old password", done => {
        chai.request(app)
            .put("/api/auth/profile")
            .send({name: "MUCYO", email: "alainmucyo3@gmail.com", old_password: "password", password: "password"})
            .set("Authorization", "Bearer " + token)
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })
    it("It should update user profile with enough data", done => {
        chai.request(app)
            .put("/api/auth/profile")
            .send({name: "MUCYO", email: "alainmucyo3@gmail.com"})
            .set("Authorization", "Bearer " + token)
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })
    it("It should update user profile with image", done => {
        chai.request(app)
            .put("/api/auth/profile")
            .set("Authorization", "Bearer " + token)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .field("name", "MUCYO")
            .field("email", "alainmucyo3@gmail.com")
            .attach("image", "storage/user.jpg")
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    }).timeout(50000)
    it("It should show admin reports", done => {
        chai.request(app)
            .get("/api/admin/reports")
            .set("Authorization", "Bearer " + token)
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })
    it("It should not show admin reports without token", done => {
        chai.request(app)
            .get("/api/admin/reports")
            .end((err, res) => {
                expect(res).to.have.status(401)
                done()
            })
    })

}
