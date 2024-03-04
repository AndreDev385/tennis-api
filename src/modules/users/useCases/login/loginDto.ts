/**
* @openapi
* components:
*   schemas:
*     LoginDto:
*       type: object
*       properties:
*         email:
*           type: string
*           example: jane.doe@example.com
*         password:
*           type: string
*           example: Ab1234**
*       required:
*         - email
*         - password
*/
export interface LoginDto {
    email: string;
    password: string;
}
