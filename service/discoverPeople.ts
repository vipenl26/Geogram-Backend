import { getUserIdFromContext } from "./helper.ts"
import getEntriesFromCoordinatesTable from "../database_service/getEntriesFromCoordinatesTable.ts"
import { getDistanceBetweenCoords } from "./helper.ts"
import {getNumericDate} from "https://deno.land/x/djwt@v2.4/mod.ts";

const LASTSEEN_TIMEOUT = Number(Deno.env.get("LASTSEEN_TIMEOUT"))
const discoverPeople = async (ctx:Record<string, unknown>) => {
    const id = getUserIdFromContext(ctx)


    const people = await getEntriesFromCoordinatesTable()

    const me = people.filter((person) => person.id == id).at(0)

    if (me == undefined) {
        return []
    }
    
    return people.filter((person) => {
        return (getNumericDate(0) - person.lastseen <= LASTSEEN_TIMEOUT) &&
         person.id != id && getDistanceBetweenCoords(me.latitude, me.longitude, person.latitude, person.longitude) <= Math.min(me.discoverradius, person.discoverradius)
    }).map((person) => {
        return {
            id: person.id,
            latitude: person.latitude,
            longitude: person.longitude
        }
    })

}

export default discoverPeople