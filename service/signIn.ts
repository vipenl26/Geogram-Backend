import { hash } from "https://deno.land/x/bcrypt@v0.4.1/src/main.ts";
import doesUsernameExistsDB from "../database_service/doesUsernameExistsDB.ts"
import getSaltOfUserDB from "../database_service/getSaltOfUserDB.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import {generateJWT} from "./jwtHelper.ts"
import verifyPasswordDB from "../database_service/verifyPasswordDB.ts";

const signIn = async (username: string, password: string) => {
    const SIGNIN_FAILED = "Username or password is incorrect";
    const SIGNIN_SUCCESS = "Signin sucess"

    if (!(await doesUsernameExistsDB(username))) {
        return {message: SIGNIN_FAILED}
    }

    const salt = await getSaltOfUserDB(username)

    const hashedPassword = await bcrypt.hash(password, salt)

    const ok = await verifyPasswordDB(username, hashedPassword)


    if (ok) {
        const jwt = generateJWT({username: username})
        return {message: SIGNIN_SUCCESS, accessToken: jwt}
    }

    return {message: SIGNIN_FAILED}

}

export default signIn