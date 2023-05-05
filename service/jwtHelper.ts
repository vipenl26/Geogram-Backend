import {getNumericDate} from "https://deno.land/x/djwt@v2.4/mod.ts";
import "https://deno.land/x/dotenv@v3.2.2/load.ts"
import { createToken, verifyToken } from "./encryptionHelper.ts";

const ACCESS_TOKEN_SECRET = Deno.env.get("ACCESS_TOKEN_SECRET") || ""

const JWT_VALIDITY = Number(Deno.env.get("JWT_VALIDITY")) // in seconds
// deno-lint-ignore ban-types
const generateJWT = (data: Object) => {
    const payload = {
        ...data,
        exp: getNumericDate(JWT_VALIDITY),
    };
    //console.log(getNumericDate(expireLimit))
    
    const header = {
        algorithm: "my-implementation"
    }

    const jwt = createToken(header, payload, ACCESS_TOKEN_SECRET)



    return jwt

}


// deno-lint-ignore ban-types
const validateJWT = (jwt: string): {isValid: boolean, payload?: object} => {
    try {
        const payload = verifyToken(jwt, ACCESS_TOKEN_SECRET)
        if (!payload.isValid) {
            return {isValid: false}
        }
        if ('exp' in payload && typeof payload.exp == 'number') {
            if (payload.exp < getNumericDate(0)) {
                return {isValid: false}
            }
            else {
                return {isValid: true, payload: payload}
            }
        }
      }
      catch(_e){
        const e:Error= _e;
        console.log(e.message);
      }

    return {isValid: false}
}
export {generateJWT, validateJWT}

