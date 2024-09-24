import { config } from "../config";

export interface IMessage {

    title: string;
    body: string;
    icon?: string;
    data?: Record<string, any>;
}

const PROJECT_ID = 'notifciationbot';

function base64UrlEncode(str: string): string {
    return btoa(str)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

function base64UrlDecode(str: string): string {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) {
        str += '=';
    }
    return atob(str);
}

function pemToArrayBuffer(pem: string): ArrayBuffer {
    const b64Lines = pem.replace(/-----[^-]+-----/g, '').replace(/\s+/g, '');
    const byteString = atob(b64Lines);
    const byteArray = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        byteArray[i] = byteString.charCodeAt(i);
    }
    return byteArray.buffer;
}

async function getAccessToken(SERVICE_ACCOUNT_KEY_BASE64: string): Promise<string> {
    try {
        if (!SERVICE_ACCOUNT_KEY_BASE64) {
            throw new Error('Service account key base64 string is not provided.');
        }
        const serviceAccountKeyString = base64UrlDecode(SERVICE_ACCOUNT_KEY_BASE64);
        const serviceAccountKey = JSON.parse(serviceAccountKeyString);
        if (!serviceAccountKey.client_email || !serviceAccountKey.private_key) {
            throw new Error('Invalid service account key');
        }
        const now = Math.floor(Date.now() / 1000);
        const payload = {
            iss: serviceAccountKey.client_email,
            scope: 'https://www.googleapis.com/auth/firebase.messaging',
            aud: 'https://oauth2.googleapis.com/token',
            exp: now + 3600, // Token expires in 1 hour
            iat: now
        };

        const header = { alg: 'RS256', typ: 'JWT' };
        const encodedHeader = base64UrlEncode(JSON.stringify(header));
        const encodedPayload = base64UrlEncode(JSON.stringify(payload));
        const toSign = `${encodedHeader}.${encodedPayload}`;

        const keyData = pemToArrayBuffer(serviceAccountKey.private_key);
        const cryptoKey = await crypto.subtle.importKey(
            'pkcs8',
            keyData,
            {
                name: 'RSASSA-PKCS1-v1_5',
                hash: 'SHA-256',
            },
            false,
            ['sign']
        );

        const signature = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', cryptoKey, new TextEncoder().encode(toSign));
        const base64Signature = base64UrlEncode(String.fromCharCode(...new Uint8Array(signature)));
        const jwt = `${toSign}.${base64Signature}`;

        const response = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                assertion: jwt
            })
        });

        const data = await response.json();
        if (data.error) {
            throw new Error(data.error_description || 'Error fetching access token');
        }
        return data.access_token;
    } catch (error) {
        console.error('Error fetching access token:', error);
        throw error;
    }
}

export const sendPushNotification = async (token: string, message: IMessage) => {

    const serviceAccountKeyBase64 = config.app.ENCODED_SERVICE_ACCOUNT_KEY;
    try {

        const accessToken = await getAccessToken(serviceAccountKeyBase64);


        const url = `https://fcm.googleapis.com/v1/projects/${PROJECT_ID}/messages:send`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        };
        const payload = {
            message: {
                token: token,
                notification: {
                    title: message.title,
                    body: message.body,
                    icon: message.icon,


                },
                data: message.data,
            }
        };

        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(payload),
        });

        const data = await response.json();
        if (data.error) {
            throw new Error(data.error.message || 'Error sending push notification');
        }
        console.log('data', data);
        return data;
    } catch (error) {
        console.error('Error sending push notification:', error);
        throw error;
    }
};
