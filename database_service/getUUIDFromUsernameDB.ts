import connection from "./dbConnection.ts"

const getUUIDFromUsernameDB = async(username: string) => {
    const result = await connection.queryObject`
        SELECT id FROM users
        WHERE username=${username}
    `

    if (result.rowCount != 0) {
        const obj = result.rows.at(0)
        if (obj != null && typeof obj == 'object' && 'id' in obj && typeof obj.id == 'string') {
            return obj.id
        }
    }

    throw Error("Invalid username")

}

export default getUUIDFromUsernameDB