import createNewUser from "../service/createNewUser.ts"
import signIn from "../service/signIn.ts"
import whoami from "../service/whoami.ts"
import sendMessage from "../service/sendMessage.ts"
import getConversation from "../service/getConversation.ts"
import updateCoordinates from "../service/updateCoordinates.ts"
import discoverPeople from "../service/discoverPeople.ts"
const resolvers = {
    Query: {
      hello: () => `Hello, World!`,
      bye: () => `hehe hoho`,
      signIn: (_parent: unknown, args: {username: string, password: string}) => signIn(args.username, args.password),
      whoami: (_parent: unknown, _args: unknown, ctx:Record<string, unknown>) => whoami(ctx),
      getConversation: (_parent: unknown,args: {receiverUserId: string, limit: number, offset: number}, ctx:Record<string, unknown>) => getConversation(ctx, args),
      discoverPeople: (_parent: unknown, _args: unknown, ctx:Record<string, unknown>) => discoverPeople(ctx)
    },

    Mutation: {
        createNewUser: (_parent: unknown, args: {username: string, password: string, fullname: string}) => createNewUser(args.username,args.password, args.fullname),
        sendMessage: (_parent: unknown, args: {messagedata: string, receiverUserId: string, messagetimestamp:string}, ctx:Record<string, unknown>) => sendMessage(ctx, args.messagedata, args.receiverUserId, args.messagetimestamp),
        updateCoordinates: (_parent: unknown, args: {latitude: string, longitude: string, discoverradius: string}, ctx:Record<string, unknown>) => updateCoordinates(ctx, args)
      }
}

export default resolvers