import connection from "./dbConnection.ts"
const deleteEntryFromFriendsTable = (xid: string, yid: string) => {
    connection.queryObject`
        DELETE FROM friends
        WHERE xid=${xid} AND yid=${yid} OR xid=${yid} AND yid=${xid};
    `
}

export default deleteEntryFromFriendsTable