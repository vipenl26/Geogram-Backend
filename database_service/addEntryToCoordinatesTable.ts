import connection from "./dbConnection.ts"
const addEntryToCoordinatesTable = (args: {id: string, latitude: string, longitude: string, discoverradius: string, lastseen: number}) => {
    connection.queryObject`
        INSERT INTO coordinates(id, latitude, longitude, discoverradius, lastseen)
        VALUES (${args.id}, ${args.latitude}, ${args.longitude}, ${args.discoverradius}, ${args.lastseen})
        ON CONFLICT (id) 
        DO UPDATE SET
        latitude=excluded.latitude, longitude=excluded.longitude, discoverradius=excluded.discoverradius, lastseen=excluded.lastseen;
    `

}

export default addEntryToCoordinatesTable