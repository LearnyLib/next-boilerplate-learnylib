/**
 * Options des cookies
 */
export default interface CookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  expires?: Date;
  sameSite?: boolean | 'lax' | 'strict' | 'none' | undefined;
  path?: string;
}
