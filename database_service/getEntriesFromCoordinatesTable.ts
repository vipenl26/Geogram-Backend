import connection from "./dbConnection.ts"
const getEntriesFromCoordinatesTable = async() => {
    const result = await connection.queryArray`
        SELECT * FROM coordinates;
    `

    type reqType = {id: string, latitude: string, longitude: string, discoverradius: number, lastseen: number}

    const objList: reqType[] = []

    if (result.rowCount == undefined) {
        return objList
    }

    for (let i = 0; i < result.rowCount; i++) {
        const ls = result.rows.at(i)
        if (ls != undefined && ls.length == 5 && typeof ls[0] == 'string' &&
         typeof ls[1] == 'string' && typeof ls[2] == "string" && typeof ls[3] == 'number' && typeof ls[4] == 'bigint') {
            objList.push({
                id: ls[0],
                latitude: ls[1],
                longitude: ls[2],
                discoverradius: ls[3],
                lastseen: Number(ls[4])
            })

        }
    }

    return objList
    
} 


export default getEntriesFromCoordinatesTable