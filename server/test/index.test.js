import {queryTest} from "./query/query.test";
import {articleTest} from "./article/article.test";
import {loginTest} from "./login/login.test";

describe("My brand: ", () => {
    describe("Query: ", queryTest)
    describe("Articles: ", articleTest)
    describe("Auth: ",loginTest)
})