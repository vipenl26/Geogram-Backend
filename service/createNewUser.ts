import doesUsernameExistsDB from "../database_service/doesUsernameExistsDB.ts"
import createNewUserDB from "../database_service/createNewUserDB.ts"
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
const createNewUser = async(username: string, password: string, fullname: string) => {

    if (await doesUsernameExistsDB(username)) {
        return {message: "Username already exists"}
    }

    if (password.length < 8) {
        return {message: "Password length is less than 8 characters"}
    }
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        
        createNewUserDB({
            username: username,
            hashedPassword: hashedPassword,
            salt: salt,
            fullname: fullname
        })

        return {message: "user created"}
    }
    catch (exp) {
        console.log(exp)
        return {message: "User creation failed"}
    }

}

export default createNewUser