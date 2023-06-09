import { AuthService } from "../../../../modules/users/services/auth/authService";

export class Middleware {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    private endRequest(
        status: 400 | 401 | 403,
        message: string,
        res: any
    ): any {
        return res.status(status).send({ message });
    }

    public ensureAuthenticated() {
        return async (req, res, next) => {
            const token = req.headers["authorization"];

            console.log(token, "TOKEN");
            // Confirm that the token was signed with our signature.
            if (token) {
                const decoded = await this.authService.decodeJWT(token);
                const signatureFailed = !!decoded === false;

                if (signatureFailed) {
                    return this.endRequest(
                        403,
                        "No autorizado.",
                        res
                    );
                }

                // if the token was found, just continue the request.
                req.decoded = decoded;
                return next();
            } else {
                return this.endRequest(403, "No autorizado.", res);
            }
        };
    }
}
