import createNewUser from "../service/createNewUser.ts"
import signIn from "../service/signIn.ts"
import whoami from "../service/whoami.ts"
import sendMessage from "../service/sendMessage.ts"
import getConversation from "../service/getConversation.ts"
import updateCoordinates from "../service/updateCoordinates.ts"
import discoverPeople from "../service/discoverPeople.ts"
import isFriend from "../service/isFriend.ts"
import sendFriendRequest from "../service/sendFriendRequest.ts"
import rejectFriendRequest from "../service/rejectFriendRequest.ts"
import acceptFriendRequest from "../service/acceptFriendRequest.ts";
import getUserId from "../service/getUserId.ts";
import unfriend from "../service/unfriend.ts"
import getAllFriendRequests from "../service/getAllFriendRequests.ts";
import getAllFriends from "../service/getAllFriends.ts";
import getProfile from "../service/getProfile.ts"
import setProfile from "../service/setProfile.ts"
const resolvers = {
    Query: {
      hello: () => `Hello, World!`,
      bye: () => `hehe hoho`,
      signIn: (_parent: unknown, args: {username: string, password: string}) => signIn(args.username, args.password),
      whoami: (_parent: unknown, _args: unknown, ctx:Record<string, unknown>) => whoami(ctx),
      getConversation: (_parent: unknown,args: {receiverUserId: string, limit: number, offset: number, after: number}, ctx:Record<string, unknown>) => getConversation(ctx, args),
      discoverPeople: (_parent: unknown, _args: unknown, ctx:Record<string, unknown>) => discoverPeople(ctx), 
      isFriend: (_parent: unknown, args: {id: string}, ctx:Record<string, unknown>) => isFriend(ctx, args.id),
      getUserId: (_parent: unknown, _args: unknown, ctx:Record<string, unknown>) => getUserId(ctx),
      getAllFriendRequests: (_parent: unknown, args: {limit: number, offset: number}, ctx:Record<string, unknown>) => getAllFriendRequests(ctx, args.limit, args.offset),
      getAllFriends: (_parent: unknown, args: {limit: number, offset: number}, ctx:Record<string, unknown>) => getAllFriends(ctx, args.limit, args.offset),
      getProfile: (_parent: unknown, args: {id: string | null}, ctx:Record<string, unknown>) => getProfile(ctx, args.id)
      
    },

    Mutation: {
        createNewUser: (_parent: unknown, args: {username: string, password: string}) => createNewUser(args.username,args.password),
        sendMessage: (_parent: unknown, args: {messagedata: string, receiverUserId: string, messagetimestamp:string}, ctx:Record<string, unknown>) => sendMessage(ctx, args.messagedata, args.receiverUserId, args.messagetimestamp),
        updateCoordinates: (_parent: unknown, args: {latitude: string, longitude: string, discoverradius: string}, ctx:Record<string, unknown>) => updateCoordinates(ctx, args),
        sendFriendRequest: (_parent: unknown, args: {id: string}, ctx:Record<string, unknown>) => sendFriendRequest(ctx, args.id),
        rejectFriendRequest: (_parent: unknown, args: {id: string}, ctx:Record<string, unknown>) => rejectFriendRequest(ctx, args.id),
        acceptFriendRequest: (_parent: unknown, args: {id: string}, ctx:Record<string, unknown>) => acceptFriendRequest(ctx, args.id),
        unfriend: (_parent: unknown, args: {id: string}, ctx:Record<string, unknown>) => unfriend(ctx, args.id),
        setProfile: (_parent: unknown, args: {profile:{bio: string, gender: string, fullName: string}}, ctx:Record<string, unknown>) => setProfile(ctx, args.profile)

      }
}

export default resolvers