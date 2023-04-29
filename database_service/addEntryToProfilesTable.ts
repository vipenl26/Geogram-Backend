import connection from "./dbConnection.ts"
const addEntryToProfilesTable = (args: {id: string, bio: string, gender: string, fullName: string}) => {
    connection.queryObject`
        INSERT INTO profiles(id, full_name, bio, gender)
        VALUES (${args.id}, ${args.fullName}, ${args.bio}, ${args.gender})
        ON CONFLICT (id) 
        DO UPDATE SET
        bio=excluded.bio, gender=excluded.gender, full_name=excluded.full_name;
    `

}

export default addEntryToProfilesTable
