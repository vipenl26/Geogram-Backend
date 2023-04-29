import addEntryToProfilesTable from "../database_service/addEntryToProfilesTable.ts"
import getEntryFromProfilesTable from "../database_service/getEntryFromProfilesTable.ts"
import { getUserIdFromContext } from "./helper.ts"


const setProfile = async(ctx:Record<string, unknown>, args: {bio: string, gender: string}) => {
    const id = getUserIdFromContext(ctx)

    let obj = await getEntryFromProfilesTable(id)

    const temp = Object.fromEntries(Object.entries(args).filter(([_, v]) => v != null));

    obj = {...obj, ...temp}

    addEntryToProfilesTable({id: id, ...obj})

    return {message: "updated", showMessage: false}

}

export default setProfile