import connection from "./dbConnection.ts"

const createNewUserDB = (args: {username: string, hashedPassword: string, salt: string}) => {
    connection.queryObject`
    INSERT INTO users (username, hashedpassword, salt) 
    VALUES (${args.username}, ${args.hashedPassword}, ${args.salt});
    `
}  


export default createNewUserDB