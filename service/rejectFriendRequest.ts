import deleteEntryFromRequestsTable from "../database_service/deleteEntryFromRequestsTable.ts"
import existsInRequestsTable from "../database_service/existsInRequestsTable.ts"
import { getUserIdFromContext } from "./helper.ts"

const rejectFriendRequest = async(ctx:Record<string, unknown>, senderid: string) => {
    const receiverid = getUserIdFromContext(ctx)
    if (!(await existsInRequestsTable(senderid, receiverid))) {
        return {message: "Request doesn't exists", showMessage: true}
    }
    deleteEntryFromRequestsTable(senderid, receiverid)

    return {message: "Request rejected"}
}

export default rejectFriendRequest