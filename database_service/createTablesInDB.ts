import connection from "./dbConnection.ts"

const createTAblesInDb = async() => {
    const createUsersTable = Deno.readTextFile("./database_service/schema_design/users.sql")
    const createMessagesTable = Deno.readTextFile("./database_service/schema_design/messages.sql")
    const createCoordinatesTable = Deno.readTextFile("./database_service/schema_design/coordinates.sql")
    const createRequestsTable = Deno.readTextFile("./database_service/schema_design/requests.sql")
    const createFriendsTable = Deno.readTextFile("./database_service/schema_design/friends.sql")
    connection.queryObject(await createUsersTable)
    connection.queryObject(await createMessagesTable)
    connection.queryObject(await createCoordinatesTable)
    connection.queryObject(await createRequestsTable)
    connection.queryObject(await createFriendsTable)
}

export default createTAblesInDb