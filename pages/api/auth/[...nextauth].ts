// pages/api/auth/[...nextauth].js
import axios from "axios";
import NextAuth, { Account, NextAuthOptions, User } from "next-auth"
import { Session } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  // any secret word like: "i am a stegosaurus"
  secret: process.env.SECRET || "iamastegosaurus",

  // enabe JWT
  session: {
    strategy: "jwt",
    // maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    CredentialsProvider({
      name: "Custom",
      credentials: {
      },
      async authorize(credentials, req) {
        console.log(credentials);
        const httpClient = axios.create({
          baseURL: process.env.API_URL || 'http://44.203.214.220:7000',
          headers: {
            'Content-type': 'application/json'
          }
        })
        const res = await httpClient.post('/login',
          { 
            username: req.body!.username, 
            password: req.body!.password,
            tId: req.body!.tId
          }); // login and get user data
        console.log(res.data);
        const user = {
          id: res.data.userId,
          name: req.body!.username,
          accessToken: res.data.token, // <-- retrive JWT token from Drupal response
        };
        console.log(`user`, user)
        if (user) {
          return user;
        } else {
          throw new Error('invalid credentials');
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user, account }: { token: JWT, user: User | AdapterUser, account: Account | null }) {
      if (account && user) {
        console.log(user.id);
        token.accessToken = user.accessToken || ''
      }
      return token;
    },

    async session({ session, token }: { session: Session, token: JWT }) {
      session.user.accessToken = token.accessToken
      session.user.id = token.sub || ''
      return session;// The return type will match the one returned in `useSession()`
    },

    // async jwt({ token, user, account, profile, isNewUser }) {
    //   if (account) {
    //     token.account = {
    //       ...account,
    //       // access_token: user.access_token  // <-- add token to JWT (Next's) object
    //     };
    //   }
    //   return token;
    // },
    // async session({ session, token }) {
    //   return { ...session };
    // },
  },
}

export default NextAuth(authOptions)