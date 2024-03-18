import { google } from "googleapis";
import { credential } from "firebase-admin";
import { Result } from "../../../core/Result";
import { initializeApp } from "firebase-admin/app";
import path from "path";

initializeApp({
    credential: credential.cert("public/gamemind-fcm-firebase-adminsdk.json"),
});

function getAccessToken() {
    const firebaseMessagingScope =
        "https://www.googleapis.com/auth/firebase.messaging";

    return new Promise(function (resolve, reject) {
        const adminjson = path.join(
            __dirname,
            "../../../../../public/gamemind-fcm-firebase-adminsdk.json"
        );
        const key = require(adminjson);
        const jwtClient = new google.auth.JWT(
            key.client_email,
            undefined,
            key.private_key,
            [firebaseMessagingScope],
            undefined
        );

        jwtClient.authorize(function (err, tokens) {
            if (err) {
                reject(err);
                return;
            }
            resolve(tokens!.access_token);
        });
    });
}

type SendMessageArgs = {
    tokens: Array<string>;
    title: string;
    body: string;
};

export type NotificationResults = {
    successes: number;
    fails: number;
};

async function notificatePlayers({
    tokens,
    title,
    body,
}: SendMessageArgs): Promise<Result<string | NotificationResults>> {
    try {
        let results: NotificationResults = {
            successes: 0,
            fails: 0,
        };
        const projectId = "gamemind-fcm";
        const fcmURL = `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`;

        const accessToken = await getAccessToken();

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
                    Authorization: `Bearer ${accessToken}`,
                    Host: "fcm.googleapis.com",
                },
                method: "POST",
                body: JSON.stringify(content),
            };

            const response = await fetch(fcmURL, options);

            console.log(response);

            if (response.status != 200) {
                results.fails += 1;
            } else {
                results.successes += 1;
            }
        }

        console.log("Fails", results.fails);
        console.log("Successes", results.successes);
        return Result.ok(results);
    } catch (error) {
        console.log(error);
        return Result.fail("Error al enviar notificaciones");
    }
}

export { notificatePlayers };
