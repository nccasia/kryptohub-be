export interface JwtPayload {
    sub: string;
    iat: number;
    exp: number;
    username: string;
}
