import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      selectedWarehouse: string | null;
      selectedStore: string | null;
    } & DefaultSession['user'];
  }

  interface JWT {
    selectedWarehouse: string | null;
    selectedStore: string | null;
  }
}
