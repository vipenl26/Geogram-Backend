import connection from "./dbConnection.ts"


const getEntryFromProfilesTable = async(id: string) => {
    const result = await connection.queryObject`
        SELECT full_name, bio, gender FROM profiles
        WHERE id=${id};
    `
    const obj = {bio: "", gender: "", fullName: ""}
    if (result.rowCount == 1) {
        if (typeof result.rows[0] == 'object') {
            if (result.rows[0] != null && 'bio' in result.rows[0] && typeof result.rows[0].bio == 'string') {
                obj.bio = result.rows[0].bio
            }
            if (result.rows[0] != null && 'gender' in result.rows[0] && typeof result.rows[0].gender == 'string') {
                obj.gender = result.rows[0].gender
            }
            if (result.rows[0] != null && 'full_name' in result.rows[0] && typeof result.rows[0].full_name == 'string') {
                obj.fullName = result.rows[0].full_name
            }
        }
        
    }
    return obj

    
}

export default getEntryFromProfilesTable