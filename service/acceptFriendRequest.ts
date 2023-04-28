import addEntryToFriendsTable from "../database_service/addEntryToFriendsTable.ts"
import deleteEntryFromRequestsTable from "../database_service/deleteEntryFromRequestsTable.ts"
import existsInRequestsTable from "../database_service/existsInRequestsTable.ts"
import { getUserIdFromContext } from "./helper.ts"


const acceptFriendRequest = async(ctx:Record<string, unknown>, senderid: string) => {
    const receiverid = getUserIdFromContext(ctx)
    if (!(await existsInRequestsTable(senderid, receiverid))) {
        return {message: "Request doesn't exist", showMessage: true}
    }

    deleteEntryFromRequestsTable(senderid, receiverid)


    addEntryToFriendsTable(senderid, receiverid)

    return {message: "Friend request accepted"}
}

export default acceptFriendRequest