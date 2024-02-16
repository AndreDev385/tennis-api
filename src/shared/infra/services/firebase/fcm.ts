import { messaging } from "firebase-admin";
import { Result } from "../../../core/Result";
import { applicationDefault, initializeApp } from "firebase-admin/app";

initializeApp({
    credential: applicationDefault(),
    projectId: "gamemind-fcm",
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
        if (tokens.length < 1) {
            return Result.ok<void>();
        }

        const result = await messaging().sendEachForMulticast({
            tokens,
            notification: {
                title,
                body,
            },
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
