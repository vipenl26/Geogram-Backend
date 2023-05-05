import doesUsernameExistsDB from "../database_service/doesUsernameExistsDB.ts"
import getSaltOfUserDB from "../database_service/getSaltOfUserDB.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import {generateJWT} from "./jwtHelper.ts"
import verifyPasswordDB from "../database_service/verifyPasswordDB.ts";
import getUUIDFromUsernameDB from "../database_service/getUUIDFromUsernameDB.ts";
const signIn = async (username: string, password: string) => {
    const SIGNIN_FAILED = "Username or password is incorrect";
    const SIGNIN_SUCCESS = "Signin sucess"

    if (!(await doesUsernameExistsDB(username))) {
        return {message: SIGNIN_FAILED, showMessage: true}
    }


    const salt = await getSaltOfUserDB(username)

    const hashedPassword = await bcrypt.hashSync(password, salt)

    const ok = await verifyPasswordDB(username, hashedPassword)


    if (ok) {
        const userid = await getUUIDFromUsernameDB(username)
        const jwt = generateJWT({username: username, userid: userid})
        return {message: SIGNIN_SUCCESS, accessToken: jwt, showMessage: false}
    }

    return {message: SIGNIN_FAILED, showMessage: true}

}

export default signIn