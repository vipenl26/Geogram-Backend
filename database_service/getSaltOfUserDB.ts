import connection from "./dbConnection.ts"

const getSaltOfUserDB = async(username:string): Promise<string> => {
    const result = await connection.queryObject`
        SELECT salt FROM users WHERE username = ${username}
    `

    const obj: unknown = result.rows.at(0)

    if (typeof obj == "object" && obj !== null && 'salt' in obj) {
        if (obj.salt != null && typeof obj.salt === "string") {
            return obj.salt
        }
    }


    return ""

}

export default getSaltOfUserDB