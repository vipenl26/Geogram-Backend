import { Aes } from "https://deno.land/x/crypto@v0.10.0/aes.ts";
import { Cbc, Padding } from "https://deno.land/x/crypto@v0.10.0/block-modes.ts";
import { crypto, toHashString } from "https://deno.land/std@0.186.0/crypto/mod.ts";
import * as base64 from "https://denopkg.com/chiefbiiko/base64/mod.ts";
const te = new TextEncoder();
const td = new TextDecoder()
const key = te.encode("SuperDuperSecret");
const iv = new Uint8Array(16);





// deno-lint-ignore ban-types
const encrypt = (obj: object) => {
    const cipher = new Cbc(Aes, key, iv, Padding.PKCS7)
    const data = te.encode(JSON.stringify(obj));
    return base64.fromUint8Array(cipher.encrypt(data))

}

const decrypt = (data: string) => {
    const decipher = new Cbc(Aes, key, iv, Padding.PKCS7)
    try {
        const obj = JSON.parse(td.decode(decipher.decrypt(base64.toUint8Array(data))))
        return obj;
    }
    catch(_e) {
        console.log(_e)
        return null;
    }    
}

// deno-lint-ignore ban-types
const createToken = (header: object, payload: object, secret_key: string)=> {
    const t1 = encrypt(header)
    const t2 = encrypt(payload)
    const t3 = toHashString(crypto.subtle.digestSync(
        "SHA-256",
        new TextEncoder().encode(secret_key + "." + t1 + "." + t2),
    ), 'base64')

    const token = t1 + "." + t2 + "." + t3

    return token
}

const verifyToken = (token: string, secret_key: string) => {
    const l = token.split(".")

    const t1 = l[0]
    const t2 = l[1]
    const t3 = l[2]

    if (t1 == undefined || t2 == undefined || t3 == undefined) {
        return {isValid: false}
    }

    const t3_calculated = toHashString(crypto.subtle.digestSync(
        "SHA-256",
        new TextEncoder().encode(secret_key + "." + t1 + "." + t2),
    ), 'base64')


    if (t3 != t3_calculated) {
        return {isValid: false}
    }
    // const header = decrypt(t1)
    const payload = decrypt(t2)

    if (payload == null) {
        return {isValid: false}
    }

    return {isValid: true, ...payload}


}

export {createToken, verifyToken}
