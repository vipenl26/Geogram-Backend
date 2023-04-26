import { getUserIdFromContext } from "./helper.ts"
import addEntryToCoordinatesTable from "../database_service/addEntryToCoordinatesTable.ts"
import {getNumericDate} from "https://deno.land/x/djwt@v2.4/mod.ts";
const updateCoordinates = (ctx:Record<string, unknown>, args: {latitude: string, longitude: string, discoverradius: string}) => {
    const id = getUserIdFromContext(ctx)

    addEntryToCoordinatesTable({...args, id:id, lastseen: getNumericDate(0)})
    


    return {message: "updated"}

}

export default updateCoordinates