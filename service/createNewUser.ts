import doesUsernameExistsDB from "../database_service/doesUsernameExistsDB.ts"
import createNewUserDB from "../database_service/createNewUserDB.ts"
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
const createNewUser = async(username: string, password: string) => {

    if (password.length < 8) {
        return {message: "Password length is less than 8 characters", showMessage: true}
    }
    
    if (await doesUsernameExistsDB(username)) {
        return {message: "Username already exists", showMessage: true}
    }


    try {
        const salt = bcrypt.genSaltSync()
        const hashedPassword = bcrypt.hashSync(password, salt)
        
        createNewUserDB({
            username: username,
            hashedPassword: hashedPassword,
            salt: salt
        })

        return {message: "user created", showMessage: true}
    }
    catch (exp) {
        console.log(exp)
        return {message: "User creation failed", showMessage: true}
    }

}

export default createNewUser