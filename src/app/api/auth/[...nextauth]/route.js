import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const authenticateUser = async (credentials) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/api/user/authenticate`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      }
    );

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error?.message || "Authentication failed");
    }

    const user = await res.json();
    return user.data;
  } catch (error) {
    throw new Error(error.message || "An error occurred during authentication");
  }
};

const authConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "your-email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: authenticateUser,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Merge user data into the token
        token = {
          ...token,
          ...user,
          expires: new Date(user.expiresAt).getTime() / 1000,
        };
      }
      return token;
    },

    async session({ session, token }) {
      if (!token) return null; // Early return if no token
      session.user = token.fullUser || {
        id: token.id,
        email: token.email,
        username: token.username,
      };
      session.accessToken = token.accessToken;
      session.expires = new Date(token.expires * 1000).toISOString();
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
export { authConfig };
