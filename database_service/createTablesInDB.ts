import connection from "./dbConnection.ts"

const createTAblesInDb = async() => {
    const createUsersTable = Deno.readTextFile("./database_service/schema_design/users.sql")
    const createMessagesTable = Deno.readTextFile("./database_service/schema_design/messages.sql")
    connection.queryObject(await createUsersTable)
    connection.queryObject(await createMessagesTable)
}

export default createTAblesInDb