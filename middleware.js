export { default } from "next-auth/middleware";
export const config = { matcher: [process.env.NEXTAUTH_URL+"/dashboard"] };
