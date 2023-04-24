import connection from "./dbConnection.ts"

const doesUsernameExistsDB = async(username:string): Promise<boolean> => {
    const result = await connection.queryObject`
        SELECT username FROM users WHERE username = ${username}
    `

    return result.rowCount !== undefined && result.rowCount > 0
}

export default doesUsernameExistsDB