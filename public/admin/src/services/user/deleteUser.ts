import { VITE_SERVER_URL } from "../../env/env.prod";
import { Result } from "../../shared/Result";

type DeleteUserParams = {
    userId: string;
    token: string;
};

async function deleteUser({ userId, token }: DeleteUserParams) {
    const url = `${VITE_SERVER_URL}/api/v1/users/delete/${userId}`;

    const requestOptions: RequestInit = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
    };

    try {
        const response = await fetch(url, requestOptions);

        const data = await response.json();

        if (response.status != 200) {
            return Result.fail<string>(data["message"]);
        }

        return Result.ok<string>(data["message"]);
    } catch (error) {
        return Result.fail<string>("Ha ocurrido un error");
    }
}

export { deleteUser };
