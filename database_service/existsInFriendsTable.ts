import connection from "./dbConnection.ts"


const existsInFriendsTable = async(xid: string, yid: string) => {
    const result = await connection.queryObject`
     SELECT * FROM friends
     WHERE xid=${xid} AND yid=${yid};
    `

    return result.rowCount != 0
}

export default existsInFriendsTable