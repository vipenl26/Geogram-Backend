import addEntryToRequestsTable from "../database_service/addEntryToRequestsTable.ts"
import existsInRequestsTable from "../database_service/existsInRequestsTable.ts"
import { getUserIdFromContext } from "./helper.ts"
import isFriend from "./isFriend.ts"
const sendFriendRequest = async(ctx:Record<string, unknown>, receiverid: string) => {
    const senderid = getUserIdFromContext(ctx)
    if (senderid == receiverid) {
        return {message: "cannot send friend request to yourself", showMessage: true}
    }
    if (await existsInRequestsTable(senderid, receiverid)) {
        return {message: "already request has been send to this user, waiting for acceptance", showMessage: true}
    }

    if (await existsInRequestsTable(receiverid, senderid)) {
        return {message: "This user has send you a request already, you can accept it", showMessage: true}
    }

    if (await isFriend(ctx, receiverid)) {
        return {message: "Already a friend", showMessage: true}
    }

    addEntryToRequestsTable(senderid, receiverid)

    return {message: "request sent"}
}

export default sendFriendRequest