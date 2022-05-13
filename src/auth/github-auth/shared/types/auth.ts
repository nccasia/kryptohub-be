export type AuthProvider = 'github';
export type GoogleProvider = 'google';

export type JwtPayload = {
    sub?: string;

    iat?: number;

    exp?: number;

    username: string;
};
