import connection from "./dbConnection.ts"
const deleteEntryFromRequestsTable = (senderid: string, receiverid: string) => {

    connection.queryObject`
        DELETE FROM requests
        WHERE senderid=${senderid} AND receiverid=${receiverid};
    `
}

export default deleteEntryFromRequestsTable