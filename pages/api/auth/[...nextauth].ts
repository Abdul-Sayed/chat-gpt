import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.Google_Client_ID!,
      clientSecret: process.env.Google_Client_Secret!,
    }),
    // ...add more providers here
  ],
};
export default NextAuth(authOptions);
