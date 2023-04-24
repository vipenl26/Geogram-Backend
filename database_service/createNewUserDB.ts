import connection from "./dbConnection.ts"

const createNewUserDB = (args: {username: string, hashedPassword: string, salt: string, fullname: string}) => {
    connection.queryObject`
    INSERT INTO users (username, hashedpassword, salt, full_name) 
    VALUES (${args.username}, ${args.hashedPassword}, ${args.salt}, ${args.fullname});
    `
}  


export default createNewUserDB