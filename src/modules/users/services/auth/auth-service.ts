import { JWTData, JWTToken } from "../../domain/jwt";

export interface AuthService {
    signJWT(props: JWTData): JWTToken;
    decodeJWT(token: string): Promise<JWTData>;
}

