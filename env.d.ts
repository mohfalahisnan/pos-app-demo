declare namespace NodeJS {
	export interface ProcessEnv extends Dict<string> {
	  DATABASE_URL?: string;
	  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?: string;
	  CLERK_SECRET_KEY?: string;
	  EDGE_STORE_ACCESS_KEY?: string;
	  EDGE_STORE_SECRET_KEY?: string;
	  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL?: string;
	  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL?: string;
	  GOOGLE_CLIENT_SECRET?: string;
	  GOOGLE_CLIENT_ID?: string;
	  NEXTAUTH_SECRET?: string;
	  NEXTAUTH_URL?: string;
	}
}
