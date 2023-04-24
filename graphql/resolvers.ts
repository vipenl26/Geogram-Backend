import createNewUser from "../service/createNewUser.ts"
import signIn from "../service/signIn.ts"
import whoami from "../service/whoami.ts"
const resolvers = {
    Query: {
      hello: () => `Hello, World!`,
      bye: () => `hehe hoho`,
      signIn: (_parent: unknown, args: {username: string, password: string}) => signIn(args.username, args.password),
      whoami: (bearer: string) => whoami(bearer)
    },

    Mutation: {
        createNewUser: (_parent: unknown, args: {username: string, password: string, fullname: string}) => createNewUser(args.username,args.password, args.fullname),
        
    }
}

export default resolvers