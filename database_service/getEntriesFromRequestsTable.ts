import connection from "./dbConnection.ts"

const getEntriesFromRequestsTable = async(receiverid: string, limit: number, offset: number) => {
    const result = await connection.queryArray`
        SELECT senderid FROM requests
        WHERE receiverid=${receiverid}
        LIMIT ${limit}
        OFFSET ${offset};
    `

    const ls: string[] = []
    if (result.rowCount == undefined) {
        console.error("getEntriesFromRequestsTable result.rowCount is undefined")
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

export default getEntriesFromRequestsTable