import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth ({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      
    }),
    // ...add more providers here
  ],
});