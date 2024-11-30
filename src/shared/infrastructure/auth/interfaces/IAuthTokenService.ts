export interface TokenPayload {
    id: string;
    email: string;
}

export interface Tokens {
    accessToken: string;
    refreshToken: string;
}

export interface IAuthTokenService {
    generateTokens(payload: TokenPayload): Promise<Tokens>;
    verifyAccessToken(token: string): Promise<TokenPayload>;
    verifyRefreshToken(token: string): Promise<TokenPayload>;
}