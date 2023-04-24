import connection from "./dbConnection.ts"
const verifyPasswordDB = async (username: string, hashedPassword: string): Promise<boolean> => {

    const result = await connection.queryObject`
        SELECT username FROM users where username=${username} AND hashedpassword = ${hashedPassword}
    `

    if (result.rowCount != 0) {
        return true
    }
    

    return false
}


export default verifyPasswordDB