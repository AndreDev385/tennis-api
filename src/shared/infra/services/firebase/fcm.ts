import { credential } from "firebase-admin";
import { Result } from "../../../core/Result";
import { initializeApp } from "firebase-admin/app";

initializeApp({
    credential: credential.cert("public/gamemind-fcm-firebase-adminsdk.json"),
});

type SendMessageArgs = {
    tokens: Array<string>;
    title: string;
    body: string;
};

async function notificatePlayers({
    tokens,
    title,
    body,
}: SendMessageArgs): Promise<Result<string | void>> {
    try {
        let results = {
            successes: 0,
            errors: 0,
        };
        const projectId = "gamemind-fcm";
        const fcmURL = `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`;

        for (const token of tokens) {
            const content = {
                message: {
                    token: token,
                    notification: {
                        title,
                        body,
                    },
                    data: {},
                },
            };

            const options: RequestInit = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer 585becec37431357281750997578da4b84212a6d`,
                    Host: "fcm.googleapis.com",
                },
                method: "POST",
                body: JSON.stringify(content),
            };

            const response = await fetch(fcmURL, options);

            console.log(response);

            if (response.status != 200) {
                results.errors += 1;
            } else {
                results.successes += 1;
            }
        }

        console.log("Fails", results.errors);
        console.log("Successes", results.successes);
        return Result.ok<void>();
    } catch (error) {
        console.log(error);
        return Result.fail("Error al enviar notificaciones");
    }
}

export { notificatePlayers };
