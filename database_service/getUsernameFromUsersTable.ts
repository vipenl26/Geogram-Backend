import connection from "./dbConnection.ts"


const getUsernameFromUsersTable = async(id: string) => {
    const result = await connection.queryObject`
        SELECT username from users
        WHERE id = ${id};
    `
    const t = result.rows.at(0)
    if (typeof t == 'object' && t != null && 'username' in t && typeof t.username == 'string'){
        return t.username
    }
    
    return "cannot fetch username"
}

export default getUsernameFromUsersTable