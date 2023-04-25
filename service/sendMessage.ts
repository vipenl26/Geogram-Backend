import doesUseridExistsDB from "../database_service/doesUseridExistsDB.ts"
import addEntryToMessagesTable from "../database_service/addEntryToMessagesTable.ts"
import { getUserIdFromContext } from "./helper.ts"

const sendMessage = async(ctx:Record<string, unknown>, messagedata: string, receiverUserId: string, messagetimestamp: string) => {
    const userId = getUserIdFromContext(ctx)
    if (!(await doesUseridExistsDB(receiverUserId))) {
        return -1
    }
    if (userId == receiverUserId) {
        return -2
    }
    let xid:string
    let yid:string
    let incoming:boolean
    if (userId < receiverUserId) {
        xid = userId
        yid = receiverUserId
        incoming = false
    }
    else {
        xid = receiverUserId
        yid = userId
        incoming = true
    }

    const conversationid = xid + "_" + yid
    const res = await addEntryToMessagesTable({conversationid: conversationid,
         messagedata: messagedata,
         messagetimestamp: messagetimestamp,
        incoming: incoming})

    return res
    
}

// -1 for receiverUserId not found
// -2 is sendid = receiverid
// -3 fault at database service method


export default sendMessage