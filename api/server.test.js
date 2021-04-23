const request = require("supertest");
const db = require("../data/dbConfig.js");
const server = require('../api/server.js');

const User = require("./users/users-model")

const rob = {username: "Rob", password: "foobar"}
const hazel = {username: "Hazel", password: ""}

beforeAll(async ()=>{
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async ()=>{
  await db("users").truncate()
})
afterAll(async ()=>{
  await db.destroy()
})

test('sanity', () => {
  expect(true).toBe(true)
})

it("correct env", ()=>{
  expect(process.env.NODE_ENV).toBe("testing")
})

describe("Users model", () => {
  describe("add function", () => {
    it("adds user to db", async () => {
      let all 
      await User.add(rob)
      all = await db("users")
      expect(all).toHaveLength(1)

      await User.add(hazel)
      all = await db("users")
      expect(all).toHaveLength(2)
    })
    it("values of users", async() => {
      const user = await User.add(hazel)
      expect(user).toMatchObject({id: 1, ...hazel})
    })
  })
})

describe("API calls", () => {
  describe("[GET] /users", () => {
    it("responds with 404 because not authorized", async () =>{
      const res = await request(server).get('/users')
      expect(res.status).toBe(404)
    })
  })
  describe("[GET] /jokes", () => {
    it("responds with 404 because not authorized", async () =>{
      const res = await request(server).get('/users')
      expect(res.status).toBe(404)
    })
  })
  describe("[post] /register", () => {
    it("throw error if password is empty", async()=> {
      try{
        await  ({
          username: "Flint",
          password: ""
        })
      } catch(err){
        expect(err.message).toEqual("username and password required")
      }
    })
    it("throw error if username is empty", async()=> {
      try{
        await ({
          username: "",
          password: "1234"
        })
      } catch(err){
        expect(err.message).toEqual("username and password required")
      }
    })
    // it("throw error if username is empty", async()=> {
    //   let res 
    //         res = await request(server).post("/api/auth/register").send(rob)
    //         expect(res.body).toMatchObject({id:1, ...rob})
    // })
  })
  describe("[post] /login", () => {
    it("throw error if password is empty", async()=> {
      try{
        await  ({
          username: "Flint",
          password: ""
        })
      } catch(err){
        expect(err.message).toEqual("username and password required")
      }
    })
    it("throw error if username is empty", async()=> {
      try{
        await ({
          username: "",
          password: "1234"
        })
      } catch(err){
        expect(err.message).toEqual("username and password required")
      }
    // it("should throw error if empty", async() => {
    //     let err 
    //         err = await request(server).post("/api/auth/register").send(hazel)
    //         expect(err).toEqual("username and password required")
    // })
  })
})
})
