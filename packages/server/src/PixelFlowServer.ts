import {
    PurchasePayload,
    UserData,
    InitiateCheckoutPayload,
    CompleteRegistrationPayload,
    LeadPayload
} from "@jpmergulhao/pixelflow-types";

export interface PixelFlowServerConfig {
    meta?: { pixelId: string; accessToken: string; testCode?: string; apiVersion?: string };
    pinterest?: { advertiserId: string; accessToken: string; testCode?: string; apiVersion?: string };
    tiktok?: { pixelId: string; accessToken: string; testCode?: string; apiVersion?: string };
    google?: { measurementId: string; apiSecret: string; };
}

export class PixelFlowServer {
    private config: PixelFlowServerConfig;

    constructor(config: PixelFlowServerConfig) {
        this.config = config;
    }

    private async hashData(data?: string): Promise<string | undefined> {
        if (!data) return undefined;
        const normalized = data.trim().toLowerCase();
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(normalized);
        const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    private async sendToMeta(eventName: string, payload: any, userData: UserData) {
        if (!this.config.meta) return;
        const version = this.config.meta.apiVersion || "v23.0";
        const url = `https://graph.facebook.com/${version}/${this.config.meta.pixelId}/events`;

        const body: any = {
            data: [{
                event_name: eventName,
                event_time: Math.floor(Date.now() / 1000),
                action_source: "website",
                event_id: payload.eventId,
                user_data: {
                    client_ip_address: userData.clientIpAddress,
                    client_user_agent: userData.clientUserAgent,
                    em: await this.hashData(userData.email),
                    ph: await this.hashData(userData.phone),
                    fbc: userData.fbc,
                    fbp: userData.fbp
                },
                custom_data: {
                    currency: payload.currency?.toUpperCase(),
                    value: payload.value,
                    order_id: payload.orderId,
                    content_name: payload.leadType || payload.registrationMethod,
                    contents: payload.contents?.map((item: any) => ({
                        id: item.id,
                        quantity: item.quantity,
                        item_price: item.price
                    }))
                }
            }]
        };

        if (this.config.meta.testCode) body.test_event_code = this.config.meta.testCode;

        try {
            await fetch(`${url}?access_token=${this.config.meta.accessToken}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
        } catch (error) {
            console.error("[PixelFlow Server] Meta CAPI Error:", error);
        }
    }

    private async sendToPinterest(eventName: string, payload: any, userData: UserData) {
        if (!this.config.pinterest) return;
        const version = this.config.pinterest.apiVersion || "v5";
        const url = `https://api.pinterest.com/${version}/ad_accounts/${this.config.pinterest.advertiserId}/events`;
        const emailHash = await this.hashData(userData.email);

        const body: any = {
            data: [{
                event_name: eventName,
                action_source: "web",
                event_time: Math.floor(Date.now() / 1000),
                event_id: payload.eventId,
                user_data: {
                    client_ip_address: userData.clientIpAddress,
                    client_user_agent: userData.clientUserAgent,
                    em: emailHash ? [emailHash] : []
                },
                custom_data: {
                    currency: payload.currency?.toUpperCase(),
                    value: payload.value?.toString(),
                    order_id: payload.orderId,
                    lead_type: payload.leadType || payload.registrationMethod,
                    line_items: payload.contents?.map((item: any) => ({
                        product_id: item.id,
                        product_name: item.name,
                        product_price: item.price?.toString(),
                        product_quantity: item.quantity
                    }))
                }
            }]
        };

        try {
            await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.config.pinterest.accessToken}`
                },
                body: JSON.stringify(body)
            });
        } catch (error) {
            console.error("[PixelFlow Server] Pinterest API Error:", error);
        }
    }

    private async sendToTikTok(eventName: string, payload: any, userData: UserData) {
        if (!this.config.tiktok) return;
        const version = this.config.tiktok.apiVersion || "v1.3";
        const url = `https://business-api.tiktok.com/open_api/${version}/pixel/track/`;

        const emailHash = await this.hashData(userData.email);
        const phoneHash = await this.hashData(userData.phone);

        const body: any = {
            pixel_code: this.config.tiktok.pixelId,
            event: eventName,
            event_id: payload.eventId,
            timestamp: new Date().toISOString(),
            context: {
                user: {
                    emails: emailHash ? [emailHash] : undefined,
                    phone_numbers: phoneHash ? [phoneHash] : undefined,
                },
                ip: userData.clientIpAddress,
                user_agent: userData.clientUserAgent
            },
            properties: {
                currency: payload.currency?.toUpperCase(),
                value: payload.value,
                order_id: payload.orderId,
                content_name: payload.leadType || payload.registrationMethod,
                contents: payload.contents?.map((item: any) => ({
                    content_id: item.id,
                    content_name: item.name,
                    quantity: item.quantity,
                    price: item.price
                }))
            }
        };

        if (this.config.tiktok.testCode) body.test_event_code = this.config.tiktok.testCode;

        try {
            await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Token": this.config.tiktok.accessToken
                },
                body: JSON.stringify(body)
            });
        } catch (error) {
            console.error("[PixelFlow Server] TikTok API Error:", error);
        }
    }

    private async sendToGoogle(eventName: string, payload: any, userData: UserData) {
        if (!this.config.google) return;
        const { measurementId, apiSecret } = this.config.google;
        const url = `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`;

        const fallbackClientId = await this.hashData(`${userData.clientIpAddress}-${userData.clientUserAgent}`) || "unknown-client";

        const body = {
            client_id: userData.clientId || fallbackClientId,
            user_data: {
                email_address: await this.hashData(userData.email),
                phone_number: await this.hashData(userData.phone)
            },
            events: [{
                name: eventName,
                params: {
                    currency: payload.currency?.toUpperCase(),
                    value: payload.value,
                    transaction_id: payload.orderId,
                    method: payload.registrationMethod,
                    items: payload.contents?.map((item: any) => ({
                        item_id: item.id,
                        item_name: item.name,
                        price: item.price,
                        quantity: item.quantity
                    }))
                }
            }]
        };

        try {
            await fetch(url, {
                method: "POST",
                body: JSON.stringify(body)
            });
        } catch (error) {
            console.error("[PixelFlow Server] Google Measurement Protocol Error:", error);
        }
    }

    public async trackPurchase(payload: PurchasePayload, userData: UserData) {
        if (!payload.hasConsented) {
            console.warn("[PixelFlow Server] Purchase event aborted due to lack of consent.");
            return;
        }

        const { platforms } = payload;
        const promises = [];

        if (platforms.includes("meta")) promises.push(this.sendToMeta("Purchase", payload, userData));
        if (platforms.includes("pinterest")) promises.push(this.sendToPinterest("checkout", payload, userData));
        if (platforms.includes("tiktok")) promises.push(this.sendToTikTok("Purchase", payload, userData));
        if (platforms.includes("google")) promises.push(this.sendToGoogle("purchase", payload, userData));

        await Promise.allSettled(promises);
    }

    public async trackInitiateCheckout(payload: InitiateCheckoutPayload, userData: UserData) {
        if (!payload.hasConsented) {
            console.warn("[PixelFlow Server] InitiateCheckout event aborted due to lack of consent.");
            return;
        }

        const { platforms } = payload;
        const promises = [];

        if (platforms.includes("meta")) promises.push(this.sendToMeta("InitiateCheckout", payload, userData));
        if (platforms.includes("pinterest")) promises.push(this.sendToPinterest("custom", { ...payload, eventName: "InitiateCheckout" }, userData));
        if (platforms.includes("tiktok")) promises.push(this.sendToTikTok("InitiateCheckout", payload, userData));
        if (platforms.includes("google")) promises.push(this.sendToGoogle("begin_checkout", payload, userData));

        await Promise.allSettled(promises);
    }

    public async trackCompleteRegistration(payload: CompleteRegistrationPayload, userData: UserData) {
        if (!payload.hasConsented) {
            console.warn("[PixelFlow Server] CompleteRegistration event aborted due to lack of consent.");
            return;
        }

        const { platforms } = payload;
        const promises = [];

        if (platforms.includes("meta")) promises.push(this.sendToMeta("CompleteRegistration", payload, userData));
        if (platforms.includes("pinterest")) promises.push(this.sendToPinterest("sign_up", payload, userData));
        if (platforms.includes("tiktok")) promises.push(this.sendToTikTok("CompleteRegistration", payload, userData));
        if (platforms.includes("google")) promises.push(this.sendToGoogle("sign_up", payload, userData));

        await Promise.allSettled(promises);
    }

    public async trackLead(payload: LeadPayload, userData: UserData) {
        if (!payload.hasConsented) {
            console.warn("[PixelFlow Server] Lead event aborted due to lack of consent.");
            return;
        }

        const { platforms } = payload;
        const promises = [];

        if (platforms.includes("meta")) promises.push(this.sendToMeta("Lead", payload, userData));
        if (platforms.includes("pinterest")) promises.push(this.sendToPinterest("lead", payload, userData));
        if (platforms.includes("tiktok")) promises.push(this.sendToTikTok("SubmitForm", payload, userData));
        if (platforms.includes("google")) promises.push(this.sendToGoogle("generate_lead", payload, userData));

        await Promise.allSettled(promises);
    }
}