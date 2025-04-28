import NextAuth, { customFetch, type NextAuthConfig } from 'next-auth';
import type { OAuthUserConfig } from 'next-auth/providers';
import GoogleProvider from 'next-auth/providers/google';
import { ProxyAgent, fetch as undici } from 'undici';

const dispatcher = new ProxyAgent(
  process.env.https_proxy || 'http://127.0.0.1:7890',
);
function proxy(...args: Parameters<typeof fetch>): ReturnType<typeof fetch> {
  // @ts-expect-error `undici` has a `duplex` option
  return undici(args[0], { ...args[1], dispatcher });
}

const providerOptions: OAuthUserConfig<any> = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
};
if (process.env.https_proxy) {
  providerOptions[customFetch] = proxy;
}

const authOptions: NextAuthConfig = {
  debug: true,
  providers: [GoogleProvider(providerOptions)],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    signIn({ profile }) {
      // eslint-disable-next-line no-console
      console.debug('[NextAuthConfig.callbacks.signIn] Got profile', profile);
      return true;
    },
  },
};

export const {
  handlers: { GET, POST },
} = NextAuth(authOptions);
