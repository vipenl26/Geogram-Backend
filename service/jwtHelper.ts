import { create, verify , getNumericDate, Payload, Header} from "https://deno.land/x/djwt@v2.4/mod.ts";
import "https://deno.land/x/dotenv/load.ts"

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
const expireLimit = 3000; // in seconds
const generateJWT = async (data: Object) => {
    const payload: Payload = {
        ...data,
        exp: getNumericDate(expireLimit),
    };
    console.log(getNumericDate(expireLimit))
    const algorithm = "HS256"

    const header: Header = {
        alg: algorithm,
        typ: "JWT",
        foo: "bar"  // custom header
    };


    const jwt = await create(header, payload, key)



    return jwt

}


const validateJWT = async (jwt: string) => {
    try {
        const payload = await verify(jwt, key); 
          console.log("JWT is valid");
          return payload
      }
      catch(_e){
        const e:Error= _e;
        console.log(e.message);
      }

    return {message: "invalid jwt token"}
}
export {generateJWT, validateJWT}

