import { assert, assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import {getDistanceBetweenCoords} from "../service/helper.ts"
import { createToken, verifyToken } from "../service/encryptionHelper.ts";

Deno.test("coords distance test", () => {
    const result = getDistanceBetweenCoords("17.453243", "78.2323232", "17.3323445", "78.123434")
    const expected = 17.726384828369508

    assertEquals(result, expected);
});


Deno.test("jwt test", () => {
    const header = {algorithm: "sample_algorithm"}
    const payload = {name: "Eren Yeager", age: 22, favouriteColor: "black"}
    const secret_key = "super_secret_key"
    const token = createToken(header, payload, secret_key)

    const result = verifyToken(token, secret_key)
    assert(result.isValid)
});




