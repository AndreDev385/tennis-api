import express from "express"

import { JWTData } from "../../../domain/jwt"

export interface DecodedRequest extends express.Request {
    decoded: JWTData
}
