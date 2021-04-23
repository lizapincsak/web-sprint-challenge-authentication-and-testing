const db = require("../../data/dbConfig.js");

function find(){
    return db("users")
}

function findById(id){
    return db("users as u")
    .where("u.id", id)
    .first()
}

function findBy(filter){
    return db("users")
    .where(filter)
}

async function add({username, password}){
    const [id] = await db("users").insert({username, password})
    return findById(id)
}

module.exports = {
    find, add, findById, findBy
}