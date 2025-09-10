import("node-fetch");
import Homey from "homey";

const BASE_URL = "https://api.danfoss.com";
const CLIENT_ID = Homey.env.DANFOSS_CONSUMER_KEY;
const CLIENT_SECRET = Homey.env.DANFOSS_CONSUMER_SECRET;

export type AccessTokenResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
}

export async function getAccessToken(): Promise<AccessTokenResponse> {
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
        throw new Error(
            `Failed to fetch Danfoss access token: ${response.status} ${response.statusText}`
        );
    }

    const token = await response.json() as AccessTokenResponse;
    return token;
}

export type DefaultErrorResponse = {
    type: string;
    title: string;
    status: number;
    detail?: string;
    message_id: string;
}

export type StatusItem = {
    code: string;
    value: string | number | boolean;
}

export type Device = {
    active_time: number;
    create_time: number;
    id: string;
    name: string;
    online: boolean;
    status: StatusItem[];
    sub: boolean;
    time_zone: string;
    update_time: number;
    device_type: string;
}

export type ListDevicesResponse = {
    result: Device[];
    t: number;
}

// You can query the details about operable devices, including properties and the latest status of the device
export async function listDevices(accessToken: string): Promise<ListDevicesResponse> {
    const url = `${BASE_URL}/ally/devices`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Accept": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(
            `Failed to list Danfoss devices: ${response.status} ${response.statusText}`
        );
    }

    const devices = await response.json() as ListDevicesResponse;
    return devices;
}

export type GetDeviceDetailResponse = {
    result: Device;
    t: number;
}

// Get device details
export async function getDeviceDetail(accessToken: string, deviceId: string): Promise<GetDeviceDetailResponse> {
    const url = `${BASE_URL}/ally/devices/${deviceId}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Accept": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(
            `Failed to get Danfoss device detail: ${response.status} ${response.statusText}`
        );
    }

    const device = await response.json() as GetDeviceDetailResponse;
    return device;
}

export type Command = {
    code: string;
    value: string | number | boolean;
}

export type IssueDeviceCommandBody = {
    commands: Command[];
}

export type IssueDeviceCommandResponse = {
    result: boolean;
    t: number;
}

// Write settings to a Danfoss Ally™ device
export async function issueDeviceCommand(accessToken: string, deviceId: string, commands: Command[]): Promise<IssueDeviceCommandResponse> {
    const url = `${BASE_URL}/ally/devices/${deviceId}/commands`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
            commands
        } as IssueDeviceCommandBody)
    });

    if (!response.ok) {
        throw new Error(
            `Failed to issue Danfoss device command: ${response.status} ${response.statusText}`
        );
    }

    const result = await response.json() as IssueDeviceCommandResponse;
    return result;
}

export type QueryLatestDeviceStatusResponse = {
    result: StatusItem[];
    t: number;
}

// Query the latest status of the device based on the device id
export async function queryLatestDeviceStatus(accessToken: string, deviceId: string): Promise<QueryLatestDeviceStatusResponse> {
    const url = `${BASE_URL}/ally/devices/${deviceId}/status`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Accept": "application/json",
        }
    });

    if (!response.ok) {
        throw new Error(
            `Failed to query the latest Danfoss device status: ${response.status} ${response.statusText}`
        );
    }

    const status = await response.json() as QueryLatestDeviceStatusResponse;
    return status;
}

export type DeviceInfo = {
    active_time: number;
    create_time: number;
    id: string;
    name: string;
    online: boolean;
}

export type QueryDevicesUnderGatewayResponse = {
    result: DeviceInfo[];
    t: number;
}

// Query the device list under the gateway
export async function queryDevicesUnderGateway(accessToken: string, deviceId: string): Promise<QueryDevicesUnderGatewayResponse> {
    const url = `${BASE_URL}/ally/devices/${deviceId}/sub-devices`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Accept": "application/json",
        }
    });

    if (!response.ok) {
        throw new Error(
            `Failed to query Danfoss devices under the gateway: ${response.status} ${response.statusText}`
        );
    }

    const devices = await response.json() as QueryDevicesUnderGatewayResponse;
    return devices;
}
