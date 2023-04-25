import connection from "./dbConnection.ts"

const addEntryToMessagesTable = async (args: {incoming: boolean, conversationid: string, messagedata: string, messagetimestamp: string}): Promise<number> => {
    await connection.queryObject`
        INSERT INTO messages(conversationid, messagedata, incoming, messagetimestamp)
        VALUES(${args.conversationid}, ${args.messagedata}, ${args.incoming}, ${args.messagetimestamp});
    `

    const result = await connection.queryObject`
        SELECT messageid FROM messages
        WHERE conversationid=${args.conversationid}
        ORDER BY messageid DESC
        LIMIT 1; 
    `

    const obj: unknown = result.rows.at(0)

    if (typeof obj == "object" && obj !== null && 'messageid' in obj && obj.messageid != null && typeof obj.messageid == 'number') {
        return obj.messageid
    }

    return -3
}

export default addEntryToMessagesTable