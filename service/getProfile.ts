import existsInRequestsTable from "../database_service/existsInRequestsTable.ts"
import getEntryFromProfilesTable from "../database_service/getEntryFromProfilesTable.ts"
import getUsernameFromUsersTable from "../database_service/getUsernameFromUsersTable.ts"

import { getUserIdFromContext } from "./helper.ts"
import isFriend from "./isFriend.ts"


const getProfile = async(ctx:Record<string, unknown>, id: string | null) => {
    if (id == null){
        id = getUserIdFromContext(ctx)
    }
    const obj = await getEntryFromProfilesTable(id)
    const username = await getUsernameFromUsersTable(id)
    const isfriend = await isFriend(ctx, id)
    const ispending = (await existsInRequestsTable(getUserIdFromContext(ctx), id) || await existsInRequestsTable(id, getUserIdFromContext(ctx)))
    return {...obj, username: username, isFriend: isfriend, isPending: ispending}
    
}

export default getProfile