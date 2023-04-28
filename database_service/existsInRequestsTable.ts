import connection from "./dbConnection.ts"

const existsInRequestsTable = async (senderid: string, receiverid: string) => {
    const result = await connection.queryObject`
        SELECT * FROM requests
        WHERE senderid=${senderid} AND receiverid=${receiverid};
    `

    return result.rowCount != undefined && result.rowCount > 0
}

export default existsInRequestsTable