import getEntryFromProfilesTable from "../database_service/getEntryFromProfilesTable.ts"
import { getUserIdFromContext } from "./helper.ts"


const getProfile = async(ctx:Record<string, unknown>, id: string | null) => {
    if (id == null){
        id = getUserIdFromContext(ctx)
    }
    
    return await getEntryFromProfilesTable(id)
    
}

export default getProfile