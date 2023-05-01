import getEntryFromProfilesTable from "../database_service/getEntryFromProfilesTable.ts"
import getUsernameFromUsersTable from "../database_service/getUsernameFromUsersTable.ts"

import { getUserIdFromContext } from "./helper.ts"


const getProfile = async(ctx:Record<string, unknown>, id: string | null) => {
    if (id == null){
        id = getUserIdFromContext(ctx)
    }
    const obj = await getEntryFromProfilesTable(id)
    const username = await getUsernameFromUsersTable(id)
    return {...obj, username: username}
    
}

export default getProfile