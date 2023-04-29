import connection from "./dbConnection.ts"
const getEntriesFromMessagesTable = async(conversationId: string, limit: number, offset: number, after:number) => {
    const result = await connection.queryArray`
        SELECT messagedata,messagetimestamp,messageid,incoming FROM messages
        WHERE conversationid=${conversationId} AND messageid > ${after}
        ORDER BY messageid DESC
        LIMIT ${limit}
        OFFSET ${offset};
    `

    const convo: {messagedata: string, messagetimestamp: string, messageid:number, incoming: boolean}[] = []

    for (let i = 0; i < result.rows.length; i++) {
        const t = result.rows.at(i)
        if (t!=undefined && t.length == 4 && typeof t[0] == 'string' && typeof t[1] == 'object' && t[1]!=null && typeof t[2] == 'number' && typeof t[3] == 'boolean') {
            convo.push({
                messagedata: t[0],
                messagetimestamp: t[1].toString(),
                messageid: t[2],
                incoming: t[3]
            })
        }
    }
    
    return convo.toReversed()
}

export default getEntriesFromMessagesTable