import path from "path";
import { AuthService } from "../../../../modules/users/services/auth/authService";
import multer from 'multer';
import { NextFunction, Response } from "express";
import { DecodedRequest } from "../../../../modules/users/infra/http/models/decodedRequest";

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
        return async (req: DecodedRequest, res: Response, next: NextFunction) => {
            const token = req.headers["authorization"];
            if (token) {
                const decoded = await this.authService.decodeJWT(token);
                const signatureFailed = !!decoded as boolean === false;

                if (signatureFailed) {
                    return this.endRequest(
                        403,
                        "No autorizado.",
                        res
                    );
                }
                req.decoded = decoded!;
                return next();
            } else {
                return this.endRequest(403, "No autorizado.", res);
            }
        };
    }

    public adminAuthenticated() {
        return async (req: DecodedRequest, res: Response, next: NextFunction) => {
            const token = req.headers["authorization"];
            // Confirm that the token was signed with our signature.
            if (token) {
                const decoded = await this.authService.decodeJWT(token);
                const signatureFailed = !!decoded as boolean === false;
                if (signatureFailed) {
                    return this.endRequest(
                        403,
                        "No autorizado.",
                        res
                    );
                }
                if (!decoded?.isAdmin) {
                    return this.endRequest(
                        403,
                        "No autorizado.",
                        res
                    );
                }
                req.decoded = decoded;
                return next();
            } else {
                return this.endRequest(403, "No autorizado.", res);
            }
        };
    }

    public uploadImageHandler = multer({
        storage: multer.diskStorage({}),
        fileFilter: (req, file, cb) => {
            const ext = path.extname(file.originalname)
            console.log("Extension", ext)
            cb(null, true);
        }
    })
}
