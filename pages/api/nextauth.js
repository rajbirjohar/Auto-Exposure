import NextAuth from 'next-auth'
import NextAut from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
    // Configure auth providers
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],

    // Linking to MongoDB
    database: process.env.MONGODB_URI,
})