import { getUserIdFromContext } from "./helper.ts"
import doesUseridExistsDB from "../database_service/doesUseridExistsDB.ts"
import getEntriesFromMessagesTable from "../database_service/getEntriesFromMessagesTable.ts"

const getConversation = async(ctx: Record<string, unknown>, args: {receiverUserId: string, limit: number, offset: number}) => {
    const userId = getUserIdFromContext(ctx)
    if (!(await doesUseridExistsDB(args.receiverUserId))) {
        return []
    }

    if (userId == args.receiverUserId) {
        return []
    }
    
    let flipIncoming = false
    let xid: string = userId
    let yid: string = args.receiverUserId

    if (userId > args.receiverUserId){
        [xid, yid] = [userId, args.receiverUserId]
        flipIncoming = true
    }

    const conversationId = xid + "_" + yid

    const convo = await getEntriesFromMessagesTable(conversationId, args.limit, args.offset)

    if (flipIncoming) {
        for (let i = 0; i < convo.length; i++) {
            convo[i].incoming = !convo[i].incoming
        }
    }

    return convo
}

export default getConversation