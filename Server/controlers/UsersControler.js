const pool = require('../config/db');
const Users = require('../models/Users.js')


async function getUsers(req, res){

    try{
        const users = await Users.importUsers()
        res.status(201).json({Users : users})

    }catch(error){
        console.error(error)
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {getUsers}