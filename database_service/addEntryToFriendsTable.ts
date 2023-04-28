import connection from "./dbConnection.ts"

const addEntryToFriendsTable = (xid: string, yid: string) => {
    connection.queryObject`
        INSERT INTO friends(xid, yid)
        VALUES(${xid}, ${yid}),(${yid}, ${xid});
    `
}

export default addEntryToFriendsTable