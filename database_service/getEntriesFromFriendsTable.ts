import connection from "./dbConnection.ts"

const getEntriesFromFriendsTable = async(id: string, limit: number, offset: number) => {
    const result = await connection.queryArray`
        SELECT yid FROM friends
        WHERE xid=${id}
        LIMIT ${limit}
        OFFSET ${offset};
    `

    const ls: string[] = []
    if (result.rowCount == undefined) {
        console.error("getEntriesFromFriendsTable result.rowCount is undefined")
        return []
    }

    for (let i = 0; i < result.rowCount; i++) {
        const arr = result.rows[i]

        if (arr[0]!=undefined && typeof arr[0] == 'string') {
            ls.push(arr[0])
        }


    }

    return ls
}

export default getEntriesFromFriendsTable