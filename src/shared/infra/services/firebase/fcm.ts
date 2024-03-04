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
        console.log("TOKENS", tokens);

        //if (tokens.length < 1) {
        //    return Result.ok<void>();
        //}

        const result = await messaging().sendEach(
            tokens.map((t) => ({
                token: t,
                notification: {
                    title,
                    body,
                },
            }))
        );

        //{
        //tokens,
        //notification: {
        //    title,
        //    body,
        //},
        //}

        result.responses.forEach(r => {
            console.log(r)
        })
        console.log("Fails", result.failureCount);
        console.log("Successes", result.successCount);
        return Result.ok<void>();
    } catch (error) {
        console.log(error);
        return Result.fail("Error al enviar notificaciones");
    }
}

export { notificatePlayers };
