

// deno-lint-ignore no-explicit-any
const getFieldFromContext  = (ctx: Record<string, unknown>,  field: string): any => {
    const f = field;
    if (f in ctx && typeof ctx[f] == 'string'){
        return ctx[f]
    }

    return ""
}


const getUserIdFromContext = (ctx: Record<string, unknown>) => {
    return getFieldFromContext(ctx, 'userid')
}

const getUsernameFromContext = (ctx: Record<string, unknown>) => {
    return getFieldFromContext(ctx, 'username')
}
const getDistanceBetweenCoords = (lat1: string, lon1: string, lat2: string, lon2: string) => {
    return calcCrow(Number(lat1), Number(lon1), Number(lat2), Number(lon2))
}

//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcCrow(lat1: number, lon1: number, lat2: number, lon2: number) 
{
    const R = 6371; // km
    const dLat = toRad(lat2-lat1);
    const dLon = toRad(lon2-lon1);
    lat1 = toRad(lat1);
    lat2 = toRad(lat2);

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c;
    return d;
}

// Converts numeric degrees to radians
function toRad(Value: number) 
{
    return Value * Math.PI / 180;
}

export {getUserIdFromContext, getUsernameFromContext, getDistanceBetweenCoords}


