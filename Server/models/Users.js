const pool = require('../config/db')

class Users {

    static async importUsers(){
        const query = `select * from users`
        const result = await pool.query(query);
        return result.rows;
    }
}


module.exports = Users;