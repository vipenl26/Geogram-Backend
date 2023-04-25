import connection from "./dbConnection.ts"

const doesUseridExistsDB = async(userid: string) => {
    const result = await connection.queryObject`
        SELECT id FROM users WHERE id = ${userid}
    `

    return result.rowCount !== undefined && result.rowCount > 0
}

export default doesUseridExistsDB