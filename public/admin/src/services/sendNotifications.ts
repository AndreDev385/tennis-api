import { VITE_SERVER_URL } from "../env/env.prod";
import { Result } from "../shared/Result";

type NotificationContent = {
    clubId: string;
    title: string;
    body?: string;
};

async function sendNotifications(
    data: NotificationContent
): Promise<Result<any>> {
    const url = `${VITE_SERVER_URL}/api/v1/club/send-notification`;
    const token: string = localStorage.getItem("authorization") || "";

    const requestOptions: RequestInit = {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify(data),
    };

    try {
        const response = await fetch(url, requestOptions);

        const data = await response.json();

        if (response.status != 200) {
            return Result.fail(data["message"]);
        }

        return Result.ok(data["message"]);
    } catch (error) {
        console.log(error);
        return Result.fail("Ha ocurrido un error");
    }
}

export { sendNotifications };
