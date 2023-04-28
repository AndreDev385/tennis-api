import jwt from "jsonwebtoken";
import { JWTData } from "../../domain/jwt";
import { AuthService } from "./auth-service";
import { environment } from "../../../../config";

export class AuthServiceImpl implements AuthService {

    public signJWT(props: JWTData): string {
        return jwt.sign(props, environment.jwt_secret);
    }

    public decodeJWT(token: string): Promise<JWTData> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, environment.jwt_secret, (err, decoded) => {
                if (err) return resolve(null);
                return resolve(decoded as JWTData);
            });
        });
    }
}
