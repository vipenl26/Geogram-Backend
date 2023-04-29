import getEntryFromProfilesTable from "../database_service/getEntryFromProfilesTable.ts"
import { getUserIdFromContext } from "./helper.ts"


const getProfile = async(ctx:Record<string, unknown>) => {
    const id = getUserIdFromContext(ctx)

    
    return await getEntryFromProfilesTable(id)
    
}

export default getProfile