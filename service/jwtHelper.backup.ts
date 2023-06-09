import { create, verify , getNumericDate, Payload, Header} from "https://deno.land/x/djwt@v2.4/mod.ts";
import "https://deno.land/x/dotenv@v3.2.2/load.ts"

const ACCESS_TOKEN_SECRET = Deno.env.get("ACCESS_TOKEN_SECRET") || ""
const encoder = new TextEncoder()
const keyBuf = encoder.encode(ACCESS_TOKEN_SECRET);


const key = await crypto.subtle.importKey(
    "raw",
    keyBuf,
    {name: "HMAC", hash: "SHA-256"},
    true,
    ["sign", "verify"],
)
const JWT_VALIDITY = Number(Deno.env.get("JWT_VALIDITY")) // in seconds
// deno-lint-ignore ban-types
const generateJWT = async (data: Object) => {
    const payload: Payload = {
        ...data,
        exp: getNumericDate(JWT_VALIDITY),
    };
    //console.log(getNumericDate(expireLimit))
    const algorithm = "HS256"

    const header: Header = {
        alg: algorithm,
        typ: "JWT",
        foo: "bar"  // custom header
    };


    const jwt = await create(header, payload, key)



    return jwt

}


const validateJWT = async (jwt: string): Promise<{isValid: boolean, payload?: Payload}> => {
    try {
        const payload = await verify(jwt, key); 
        if ('exp' in payload && typeof payload.exp == 'number') {
            if (payload.exp < getNumericDate(0)) {
                return {isValid: false}
            }
        }
        return {isValid: true, payload: payload}
      }
      catch(_e){
        const e:Error= _e;
        console.log(e.message);
      }

    return {isValid: false}
}
export {generateJWT, validateJWT}

