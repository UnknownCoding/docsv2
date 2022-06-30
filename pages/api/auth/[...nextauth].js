import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { FirebaseAdapter } from "@next-auth/firebase-adapter"
import { db } from "../../../firebase"

export default NextAuth({
  // Configure one or more authentication providers
    providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    ],
  callbacks:{
        async session({session, token ,user}){
            session.user.username=session?.user?.name
            session.user.uid=token?.sub;
            return session
        },
      },
      secret: process.env.JWT_SECRET 
    })

