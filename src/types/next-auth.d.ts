import { DefaultSession, DefaultUser } from "next-auth"
import { Session } from "next-auth"
import { JWT } from "next-auth/jwt"


interface IUser extends DefaultUser {
  id: string;
  accessToken?: string;
}
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User extends IUser {}
  interface Session {
    user: {
      /** The user's postal address. */
      id: string,
      accessToken: string
    } & DefaultSession["user"]
  }

}

declare module "next-auth/jwt" {
  interface JWT {
    /** This is an example. You can find me in types/next-auth.d.ts */
    accessToken: string
  }
}