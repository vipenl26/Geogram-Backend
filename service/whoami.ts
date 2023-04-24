import { validateJWT } from "./jwtHelper.ts"

const whoami = async (bearer: string) => {
    return await validateJWT(bearer)
}

export default whoami