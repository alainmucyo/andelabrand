import chai from "chai"
import {expect} from "chai";

const chaiHttp = require("chai-http")
import app from "../../index"
import {articles} from "./article.data";
import {generateToken} from "../../utils/passport";
import {mockUser} from "../mock-user.data";
import fs from "fs"
chai.use(chaiHttp)
const route = "/api/article"
const token = generateToken(mockUser)
let articleId;
export const articleTest = () => {
    it("It should create article with valid data", done => {
        chai.request(app)
            .post(route)
            .set("Authorization", "Bearer " + token)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .field("title", articles.valid.title)
            .field("content", articles.valid.content)
            .attach("image", "public/user.jpg")
            .end((err, res) => {
                articleId = res.body.data._id
                expect(res).to.have.status(201)
                done()
            })
    }).timeout(50000)
    it("It should list articles.", done => {
        chai.request(app)
            .get(route)
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })
    it("It should not show single article with invalid ID.", done => {
        chai.request(app)
            .get(route + "/hello")
            .end((err, res) => {
                expect(res).to.have.status(404)
                done()
            })
    })
    it("It should show single article with valid ID.", done => {
        chai.request(app)
            .get(route + "/" + articleId)
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })
    it("It should not update single article without token.", done => {
        chai.request(app)
            .put(route + "/" + articleId)
            .send(articles.valid)
            .end((err, res) => {
                expect(res).to.have.status(401)
                done()
            })
    })
   /* it("It should update single article with valid ID.", done => {
        chai.request(app)
            .put(route + "/" + articleId)
            .set("Authorization", "Bearer " + token)
            .send(articles.valid)
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })*/
    it("It should update single article with valid ID and image", done => {
        chai.request(app)
            .put(route + "/" + articleId)
            .set("Authorization", "Bearer " + token)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .field("title", articles.valid.title)
            .field("content", articles.valid.content)
            .attach("image", "public/user.jpg")
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    }).timeout(50000)
    it("It should not create article with no token", done => {
        chai.request(app)
            .post(route)
            .end((err, res) => {
                expect(res).to.have.status(401)
                done()
            })
    })
    it("It should not create article with invalid data", done => {
        chai.request(app)
            .post(route)
            .send(articles.invalid)
            .set("Authorization", "Bearer " + token)
            .end((err, res) => {
                expect(res).to.have.status(422)
                done()
            })
    })
    it("It should add a like with a valid ID", done => {
        chai.request(app)
            .put(route + "/like/" + articleId)
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })
    it("It should not add a like with a invalid ID", done => {
        chai.request(app)
            .put(route + "/like/hello")
            .end((err, res) => {
                expect(res).to.have.status(404)
                done()
            })
    })

     it("It should not add a comment without valid ID", done => {
         chai.request(app)
             .post("/api/comment/hello")
             .send(articles.commentValid)
             .end((err, res) => {
                 expect(res).to.have.status(404)
                 done()
             })
     })
     it("It should not add a comment without valid data", done => {
         chai.request(app)
             .post("/api/comment/"+articleId)
             .send(articles.commentInvalid)
             .end((err, res) => {
                 expect(res).to.have.status(422)
                 done()
             })
     })
     it("It should not add a comment without valid data", done => {
         chai.request(app)
             .post("/api/comment/"+articleId)
             .send(articles.commentValid)
             .end((err, res) => {
                 expect(res).to.have.status(201)
                 done()
             })
     })
    it("It should not delete article with wrong ID.", done => {
        chai.request(app)
            .delete(route + "/hello")
            .set("Authorization", "Bearer " + token)
            .end((err, res) => {
                expect(res).to.have.status(404)
                done()
            })
    })

    it("It should not delete article without token.", done => {
        chai.request(app)
            .delete(route + "/" + articleId)
            .end((err, res) => {
                expect(res).to.have.status(401)
                done()
            })
    })
    it("It should delete article with valid ID.", done => {
        chai.request(app)
            .delete(route + "/"+articleId)
            .set("Authorization", "Bearer " + token)
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })
    it("It should show admin reports", done => {
        chai.request(app)
            .get("/api/admin/reports")
            .set("Authorization", "Bearer " + token)
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })
}
