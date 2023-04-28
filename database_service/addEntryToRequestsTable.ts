import connection from "./dbConnection.ts"

const addEntryToRequestsTable = (senderid: string, receiverid: string) => {
    connection.queryObject`
        INSERT INTO requests(senderid, receiverid)
        VALUES(${senderid},${receiverid})
    `
}

export default addEntryToRequestsTable