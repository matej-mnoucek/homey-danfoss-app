import("node-fetch");
import Homey from "homey";

const BASE_URL = "https://api.danfoss.com";
const CLIENT_ID = Homey.env.DANFOSS_CONSUMER_KEY;
const CLIENT_SECRET = Homey.env.DANFOSS_CONSUMER_SECRET;

export type AccessToken = {
    access_token: string;
    token_type: string;
    expires_in: number;
}

export async function getAccessToken(): Promise<AccessToken> {
    const url = `${BASE_URL}/oauth2/token`;
    const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Basic ${credentials}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
    });

    if (!response.ok) {
        console.error(response);
        throw new Error(
            `Failed to fetch Danfoss access token: ${response.status} ${response.statusText}`
        );
    }

    const token = await response.json() as AccessToken;
    return token;
}
