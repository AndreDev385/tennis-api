import { credential, messaging } from "firebase-admin";
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

        const result = await messaging().sendEach(
            tokens.map((t) => ({
                token: t,
                notification: {
                    title,
                    body,
                },
                android: {
                    priority: "high",
                },
                apns: {
                    payload: {
                        aps: {
                            contentAvailable: true,
                        },
                    },
                    headers: {
                        "apns-push-type": "background",
                        "apns-priority": "5",
                        "apns-topic": "io.flutter.plugins.firebase.messaging",
                    },
                },
            }))
        );

        result.responses.forEach((r) => {
            console.log(r);
        });

        console.log("Fails", result.failureCount);
        console.log("Successes", result.successCount);
        return Result.ok<void>();
    } catch (error) {
        console.log(error);
        return Result.fail("Error al enviar notificaciones");
    }
}

export { notificatePlayers };
