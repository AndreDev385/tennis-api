import { google } from "googleapis";
import { credential } from "firebase-admin";
import { Result } from "../../../core/Result";
import { initializeApp } from "firebase-admin/app";

initializeApp({
    credential: credential.cert("public/gamemind-fcm-firebase-adminsdk.json"),
});

function getAccessToken() {
    const firebaseMessagingScope =
        "https://www.googleapis.com/auth/firebase.messaging";

    return new Promise(function(resolve, reject) {
        const jwtClient = new google.auth.JWT(
            "firebase-adminsdk-d8d6l@gamemind-fcm.iam.gserviceaccount.com",
            undefined,
            "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC7hvJbfrNs7aVH\nurm5jKeEkPZ2zKEEPB6UpTwShGEUc9BFMP21ttndAUPHFoddGzDPFE9gOMZzc2+9\ng7SmLeX8nkPDxAIufd4LVsvMjdatGdM2UB0xDg7tbwT9TjEI73PE+pC54n6dqE3w\ncq/9k6DMcXW27zry/ajnD05zoaNT52GR9JW+E6PgeetulCLShKNfr8Zz+tv0AdCh\n4rFejNgySyzwu5ZWQe+6wYXbqAUYbyjwzUfvo02HmWXXuBO6HczM6p9xZdgCC3mU\nTx9BoPmqApq/tBOuwUtYPL7IiukFyC34lNv3OsexJmrwCK9n1BrF8fl2GDUd5B6B\nUrPzBcjZAgMBAAECggEAATR7KPOZ2U63H8x/PkYdOvS4ArgqpjVxMF0V81wCqDAc\n097+WF00De+gxP4b8VEYCZKctnZy7wG8Q3Rd1C4KEusc7hx7s5sHMt00SsyUBzF5\n6hjOcTbhCW1L08lddwxb2vWNucYO8HopAw0nnJpm331wp1Pm9fIDlHWEmGle3G6G\nvaFa+KUmbDzmDXBe3GWp7S42v5yplje/Q4Poc9P4w432nNI3nYOjLql6fyMbStmJ\n4Ju0SEjaLLuEM5S0S9bWa+RgJiY7vYXm2ynqRu6BvvpM5dO59tUOekkR/hkYx3n6\ncz9pDGOPmDOx0r7vH35mu+Pz3SeSSo687G9ajXJaoQKBgQDxTdmVYmCm0fGFbwBG\nBaNwwIM2wFFkio0DEHAFcMORr/81O4TFkOWpiNJY29rN9rCmP1N1XawLsAc3/Rx/\nLT5H42vvMINBPnznPnCZoOSbcGeJKjb8wNEBxvJCxL2srkvw6+AUdFbESXnP3DEO\nBrGXvYQleixeba+xmxt2Z4QreQKBgQDG8qpAQ09AmeznlC3IHwGs50a+drLYEGyv\nA41JYd1HtXMmuQp6Tx+EZfatkydNf51k5KQ2uk8fccjHIu24iqoElR7rghPRzUXZ\nftAySY7lVtUfVgo/i/qVzXGGUp8vrvETMgZJCgFHQOWoG4M2bwaP7OJjr6tvRIN2\nmLFIdNfQYQKBgQC/oYGgPuZe1O+ndgWTljq7+ka6HnUFEXr26gDscSb+9fQJBGFm\nvLGGt5/E7aSQWM7k1/mhhWhyR7MT5bDR1s5VLOi0paQ3Fjb/NfkaKEokn1m59oqA\no2fYr3QJTlELZ8frZocn91RIwck5J7bVWr+CsADX+nRt8VHMDE/88ixmkQKBgQC9\n3Lg9u/7WWA+Osgs/ANhIei85dW4YZRRTscAUWCElXjUWr2EgeIJLiENyQw0vGKrM\nrqdI02TPTXefE+ZqR2saFHX9q5Xek1glyLBITYrhs4yQ6zu8iYoLjJTa696fUwUe\nnI8DBVlS9sw1Mox2Vl6c3CTxnaSt+2S6ud32mAueAQKBgEKYFhPUsZh4WJSNBOXM\ndTviAk7/1G+BMeL6sS+DJ6ZD/rMumJmcenmiqrXyH7DY5dNuEWIcbMrRLWwi9/lh\nb+xgg0riU0LlRtSOlknJe89zcJKd6l1AQ0izSRcH2UB8549EPMSYM0O9Zu42qkC4\nsj2rhPaNI9rKdtbjOcKx/xNE\n-----END PRIVATE KEY-----\n",
            [firebaseMessagingScope],
            undefined
        );

        jwtClient.authorize(function(err, tokens) {
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

        console.log(`access_token: ${accessToken}\n`);

        for (const token of tokens) {
            const content = {
                message: {
                    token: token,
                    notification: {
                        title,
                        body,
                    },
                    data: {},
                }
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

            const data = await response.json();

            console.log(response.status, data);

            if (response.status != 200) {
                console.log('details', data?.error?.details)
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
