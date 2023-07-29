import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";
import user from "@/models/user";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),

        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        }),

        Credentials({
            name: 'Credentials',
            credentials: {
                phone: { label: "Phone", type: "text" },
                otp: { label: "OTP", type: "text" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const res = await fetch(`${process.env.PERSONAL_HOST}/api/user/mobile/verify`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                });

                const user = await res.json();
                if (res.ok && user) {
                    return user;
                }
                // Return null if user data could not be retrieved
                return null;
            }
        }),
    ],
    session: {
        jwt: true,
    },
    pages: {
        signIn: "/auth/signup",
    },
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user?._id) {
                token.id = user._id;
            }
            return token
        },
        async session({ session, token }) {

            if (token.picture) {
                try {
                    const User = await user.findOne({ email: token.email });
                    session.user.id = User._id;
                } catch (error) {
                    console.log(error);
                }
            } else {
                session.user.id = token.id;
            }

            return session;
        },
        async signIn(user, account, profile) {
            // Check if the user already exists in your database
            const res = await fetch(`${process.env.PERSONAL_HOST}/api/google`, {
                method: 'POST',
                body: JSON.stringify(user),
                headers: { "Content-Type": "application/json" }
            });

            let User = await res.json();
            if (res.ok && User) {
                return true;
            }
            return false;
        },
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }