const request = require("supertest");
const db = require("../data/dbConfig.js");
const server = require('../api/server.js');

const User = require("./users/users-model");

const bob = {name: "Bob"}
const mary = {name: "Mary"}

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
  expect(true).toBe(false)
})

it("correct env", ()=>{
  expect(process.env.DB_ENV).toBe("testing")
})