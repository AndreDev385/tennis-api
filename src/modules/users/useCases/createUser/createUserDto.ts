/**
* @openapi
* components:
*   schemas:
*     CreateUserDto:
*       properties:
*         firstName:
*           type: string
*           example: Jane
*         lastName:
*           type: string
*           example: Doe
*         email:
*           type: string
*           example: jane.doe@example.com
*         password:
*           type: string
*           example: Abc123**
*       required:
*         - firstName
*         - lastName
*         - email
*         - password
*/
export interface CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    ci?: string;
    clubCode?: string;
    canTrack?: boolean;
}
