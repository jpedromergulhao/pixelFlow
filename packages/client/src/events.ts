import {
    AddPaymentInfoPayload,
    AddToCartPayload,
    AddToWishlistPayload,
    ApplicationApprovalPayload,
    CompleteRegistrationPayload,
    ContactPayload,
    CustomizeProductPayload,
    DonatePayload,
    DownloadPayload,
    FindLocationPayload,
    InitiateCheckoutPayload,
    LeadPayload,
    LoginPayload,
    PurchasePayload,
    RemoveFromCartPayload,
    SchedulePayload,
    SearchPayload,
    SharePayload,
    StartTrialPayload,
    SubmitApplicationPayload,
    SubscribePayload,
    ViewContentPayload
} from "@jpmergulhao/pixelflow-types";

declare global {
    interface Window {
        fbq?: (...args: any[]) => void;
        gtag?: (...args: any[]) => void;
        pintrk?: (...args: any[]) => void;
        ttq?: { track: (...args: any[]) => void };
    }
}

export const trackAddPaymentInfo = (payload: AddPaymentInfoPayload) => {
    if (!payload.hasConsented) {
        console.warn("[PixelFlow] AddPaymentInfo event blocked due to lack of consent.");
        return;
    }

    const { platforms, eventId, value, paymentType, contentIds, contents, currency } = payload;

    if (value !== undefined && !currency) {
        console.error("[PixelFlow] Error: 'currency' is required when 'value' is provided. Event trackAddPaymentInfo aborted.");
        return;
    }

    const normalizedCurrency = currency?.trim().toUpperCase();

    if (platforms.includes("meta") && typeof window.fbq === "function") {
        window.fbq(
            "track",
            "AddPaymentInfo",
            {
                currency: normalizedCurrency,
                value,
                content_ids: contentIds,
                content_name: contents?.length === 1 ? contents[0].name : undefined,
                content_category: contents?.length === 1 ? contents[0].category : undefined,
                contents: contents?.map(item => ({
                    id: item.id,
                    quantity: item.quantity,
                    item_price: item.price
                })),
            },
            { eventID: eventId }
        );
    }

    if (platforms.includes("google") && typeof window.gtag === "function") {
        window.gtag("event", "add_to_cart", {
            currency: normalizedCurrency,
            value,
            payment_type: paymentType,
            items: contents?.map(item => ({
                item_id: item.id,
                item_name: item.name,
                price: item.price,
                quantity: item.quantity,
                item_category: item.category
            })),
            event_id: eventId,
        });
    }

    if (platforms.includes("tiktok") && typeof window.ttq === "object") {
        window.ttq.track(
            "AddPaymentInfo",
            {
                currency: normalizedCurrency,
                value,
                content_id: contentIds ? contentIds.join(",") : undefined,
                contents: contents?.map(item => ({
                    content_id: item.id,
                    content_name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    content_category: item.category
                })),
            },
            { event_id: eventId }
        );
    }

    if (platforms.includes("pinterest") && typeof window.pintrk === "function") {
        window.pintrk(
            "track",
            "custom",
            {
                event_name: "AddPaymentInfo",
                currency: normalizedCurrency,
                value,
                line_items: contents?.map(item => ({
                    product_id: item.id,
                    product_name: item.name,
                    product_price: item.price,
                    product_quantity: item.quantity,
                    product_category: item.category
                }))
            },
            { event_id: eventId }
        );
    }
};

export const trackAddToCart = (payload: AddToCartPayload) => {
    if (!payload.hasConsented) {
        console.warn("[PixelFlow] AddToCart event blocked due to lack of consent.");
        return;
    }

    const { platforms, eventId, value, contentIds, contents, contentType, currency } = payload;

    if (value !== undefined && !currency) {
        console.error("[PixelFlow] Error: 'currency' is required when 'value' is provided. Event trackAddToCart aborted.");
        return;
    }

    const normalizedCurrency = currency?.trim().toUpperCase();

    if (platforms.includes("meta") && typeof window.fbq === "function") {
        window.fbq(
            "track",
            "AddToCart",
            {
                currency: normalizedCurrency,
                value,
                content_ids: contentIds,
                content_type: contentType,
                content_name: contents?.length === 1 ? contents[0].name : undefined,
                content_category: contents?.length === 1 ? contents[0].category : undefined,
                contents: contents?.map(item => ({
                    id: item.id,
                    quantity: item.quantity,
                    item_price: item.price
                })),
            },
            { eventID: eventId }
        );
    }

    if (platforms.includes("google") && typeof window.gtag === "function") {
        window.gtag("event", "add_to_cart", {
            currency: normalizedCurrency,
            value,
            items: contents?.map(item => ({
                item_id: item.id,
                item_name: item.name,
                price: item.price,
                quantity: item.quantity,
                item_category: item.category
            })),
            event_id: eventId,
        });
    }

    if (platforms.includes("tiktok") && typeof window.ttq === "object") {
        window.ttq.track(
            "AddToCart",
            {
                currency: normalizedCurrency,
                value,
                content_id: contentIds ? contentIds.join(",") : undefined,
                content_type: contentType,
                contents: contents?.map(item => ({
                    content_id: item.id,
                    content_name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    content_category: item.category
                })),
            },
            { event_id: eventId }
        );
    }

    if (platforms.includes("pinterest") && typeof window.pintrk === "function") {
        window.pintrk(
            "track",
            "addtocart",
            {
                currency: normalizedCurrency,
                value,
                line_items: contents?.map(item => ({
                    product_id: item.id,
                    product_name: item.name,
                    product_price: item.price,
                    product_quantity: item.quantity,
                    product_category: item.category
                }))
            },
            { event_id: eventId }
        );
    }
};

export const trackAddToWishlist = (payload: AddToWishlistPayload) => {
    if (!payload.hasConsented) {
        console.warn("[PixelFlow] AddToWishlist event blocked due to lack of consent.");
        return;
    }

    const { platforms, eventId, value, contentIds, contents, currency } = payload;

    if (value !== undefined && !currency) {
        console.error("[PixelFlow] Error: 'currency' is required when 'value' is provided. Event trackAddToWishlist aborted.");
        return;
    }

    const normalizedCurrency = currency?.trim().toUpperCase();

    if (platforms.includes("meta") && typeof window.fbq === "function") {
        window.fbq(
            "track",
            "AddToWishlist",
            {
                currency: normalizedCurrency,
                value,
                content_ids: contentIds,
                content_name: contents?.length === 1 ? contents[0].name : undefined,
                content_category: contents?.length === 1 ? contents[0].category : undefined,
                contents: contents?.map(item => ({
                    id: item.id,
                    quantity: item.quantity,
                    item_price: item.price
                })),
            },
            { eventID: eventId }
        );
    }

    if (platforms.includes("google") && typeof window.gtag === "function") {
        window.gtag("event", "add_to_wishlist", {
            currency: normalizedCurrency,
            value,
            items: contents?.map(item => ({
                item_id: item.id,
                item_name: item.name,
                price: item.price,
                quantity: item.quantity,
                item_category: item.category
            })),
            event_id: eventId,
        });
    }

    if (platforms.includes("tiktok") && typeof window.ttq === "object") {
        window.ttq.track(
            "AddToWishlist",
            {
                currency: normalizedCurrency,
                value,
                content_id: contentIds ? contentIds.join(",") : undefined,
                contents: contents?.map(item => ({
                    content_id: item.id,
                    content_name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    content_category: item.category
                })),
            },
            { event_id: eventId }
        );
    }

    if (platforms.includes("pinterest") && typeof window.pintrk === "function") {
        window.pintrk(
            "track",
            "custom",
            {
                event_name: "AddToWishlist",
                currency: normalizedCurrency,
                value,
                line_items: contents?.map(item => ({
                    product_id: item.id,
                    product_name: item.name,
                    product_price: item.price,
                    product_quantity: item.quantity,
                    product_category: item.category
                }))
            },
            { event_id: eventId }
        );
    }
};

export const trackDownload = (payload: DownloadPayload) => {
    if (!payload.hasConsented) {
        console.warn("[PixelFlow] Download event blocked due to lack of consent.");
        return;
    }

    const normalizedFileType = payload.fileType?.toLowerCase();
    const { platforms, eventId, value, contentIds, contents, fileName, currency } = payload;

    if (value !== undefined && !currency) {
        console.error("[PixelFlow] Error: 'currency' is required when 'value' is provided. Event trackDownload aborted.");
        return;
    }

    const normalizedCurrency = currency?.trim().toUpperCase();

    if (platforms.includes("meta") && typeof window.fbq === "function") {
        window.fbq(
            "trackCustom",
            "Download",
            {
                currency: normalizedCurrency,
                value,
                content_name: fileName,
                content_type: normalizedFileType,
                contents: contents?.map(item => ({
                    id: item.id,
                    quantity: item.quantity,
                    item_price: item.price
                })),
            },
            { eventID: eventId }
        );
    }

    if (platforms.includes("google") && typeof window.gtag === "function") {
        window.gtag("event", "file_download", {
            currency: normalizedCurrency,
            value,
            file_name: fileName,
            file_extension: normalizedFileType,
            event_id: eventId,
        });
    }

    if (platforms.includes("tiktok") && typeof window.ttq === "object") {
        window.ttq.track(
            "Download",
            {
                currency: normalizedCurrency,
                value,
                content_name: fileName,
                content_type: normalizedFileType,
                content_id: contentIds ? contentIds.join(",") : undefined,
                contents: contents?.map(item => ({
                    content_id: item.id,
                    content_name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    content_category: item.category
                })),
            },
            { event_id: eventId }
        );
    }

    if (platforms.includes("pinterest") && typeof window.pintrk === "function") {
        window.pintrk(
            "track",
            "custom",
            {
                event_name: "Download",
                currency: normalizedCurrency,
                value,
                product_name: fileName,
                product_category: normalizedFileType
            },
            { event_id: eventId }
        );
    }
};

export const trackInitiateCheckout = (payload: InitiateCheckoutPayload) => {
    if (!payload.hasConsented) {
        console.warn("[PixelFlow] InitiateCheckout event blocked due to lack of consent.");
        return;
    }

    const { platforms, eventId, value, contentIds, contents, currency } = payload;

    if (value !== undefined && !currency) {
        console.error("[PixelFlow] Error: 'currency' is required when 'value' is provided. Event trackInitiateCheckout aborted.");
        return;
    }

    const normalizedCurrency = currency?.trim().toUpperCase();

    const numItems = contents?.reduce((acc, item) => acc + item.quantity, 0);

    if (platforms.includes("meta") && typeof window.fbq === "function") {
        window.fbq(
            "track",
            "InitiateCheckout",
            {
                currency: normalizedCurrency,
                value,
                content_ids: contentIds,
                num_items: numItems,
                contents: contents?.map(item => ({
                    id: item.id,
                    quantity: item.quantity,
                    item_price: item.price
                })),
            },
            { eventID: eventId }
        );
    }

    if (platforms.includes("google") && typeof window.gtag === "function") {
        window.gtag("event", "begin_checkout", {
            currency: normalizedCurrency,
            value,
            items: contents?.map(item => ({
                item_id: item.id,
                item_name: item.name,
                price: item.price,
                quantity: item.quantity,
                item_category: item.category
            })),
            event_id: eventId,
        });
    }

    if (platforms.includes("tiktok") && typeof window.ttq === "object") {
        window.ttq.track(
            "InitiateCheckout",
            {
                currency: normalizedCurrency,
                value,
                content_id: contentIds ? contentIds.join(",") : undefined,
                contents: contents?.map(item => ({
                    content_id: item.id,
                    content_name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    content_category: item.category
                })),
            },
            { event_id: eventId }
        );
    }

    if (platforms.includes("pinterest") && typeof window.pintrk === "function") {
        window.pintrk(
            "track",
            "custom",
            {
                event_name: "InitiateCheckout",
                currency: normalizedCurrency,
                value,
                line_items: contents?.map(item => ({
                    product_id: item.id,
                    product_name: item.name,
                    product_price: item.price,
                    product_quantity: item.quantity,
                    product_category: item.category
                }))
            },
            { event_id: eventId }
        );
    }
};

export const trackPurchase = (payload: PurchasePayload) => {
    if (!payload.hasConsented) {
        console.warn("[PixelFlow] Purchase event blocked due to lack of consent.");
        return;
    }

    const { platforms, eventId, orderId, value, currency, contentIds, contents, contentType } = payload;
    const numItems = contents?.reduce((acc, item) => acc + item.quantity, 0);
    const normalizedCurrency = currency?.trim().toUpperCase();

    if (platforms.includes("meta") && typeof window.fbq === "function") {
        window.fbq(
            "track",
            "Purchase",
            {
                currency: normalizedCurrency,
                value,
                content_ids: contentIds,
                content_type: contentType,
                num_items: numItems,
                contents: contents?.map(item => ({
                    id: item.id,
                    quantity: item.quantity,
                    item_price: item.price
                })),
            },
            { eventID: eventId }
        );
    }

    if (platforms.includes("google") && typeof window.gtag === "function") {
        window.gtag("event", "purchase", {
            currency: normalizedCurrency,
            value,
            transaction_id: orderId,
            items: contents?.map(item => ({
                item_id: item.id,
                item_name: item.name,
                price: item.price,
                quantity: item.quantity,
                item_category: item.category
            })),
            event_id: eventId,
        });
    }

    if (platforms.includes("tiktok") && typeof window.ttq === "object") {
        window.ttq.track(
            "Purchase",
            {
                currency: normalizedCurrency,
                value,
                content_type: contentType,
                content_id: contentIds ? contentIds.join(",") : undefined,
                contents: contents?.map(item => ({
                    content_id: item.id,
                    content_name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    content_category: item.category
                })),
            },
            { event_id: eventId }
        );
    }

    if (platforms.includes("pinterest") && typeof window.pintrk === "function") {
        window.pintrk(
            "track",
            "checkout",
            {
                currency: normalizedCurrency,
                value,
                order_id: orderId,
                line_items: contents?.map(item => ({
                    product_id: item.id,
                    product_name: item.name,
                    product_price: item.price,
                    product_quantity: item.quantity,
                    product_category: item.category
                }))
            },
            { event_id: eventId }
        );
    }
};

export const trackSearch = (payload: SearchPayload) => {
    if (!payload.hasConsented) {
        console.warn("[PixelFlow] Search event blocked due to lack of consent.");
        return;
    }

    const { platforms, eventId, searchString, value, currency, contentType, contentIds, contents } = payload;

    if (value !== undefined && !currency) {
        console.error("[PixelFlow] Error: 'currency' is required when 'value' is provided. Event trackSearch aborted.");
        return;
    }

    const normalizedCurrency = currency?.trim().toUpperCase();

    if (platforms.includes("meta") && typeof window.fbq === "function") {
        window.fbq(
            "track",
            "Search",
            {
                search_string: searchString,
                currency: normalizedCurrency,
                value,
                content_ids: contentIds,
                content_type: contentType,
                contents: contents?.map(item => ({
                    id: item.id,
                    quantity: item.quantity,
                    item_price: item.price
                })),
            },
            { eventID: eventId }
        );
    }

    if (platforms.includes("google") && typeof window.gtag === "function") {
        window.gtag("event", "search", {
            search_term: searchString,
            currency: normalizedCurrency,
            value,
            items: contents?.map(item => ({
                item_id: item.id,
                item_name: item.name,
                price: item.price,
                quantity: item.quantity,
                item_category: item.category
            })),
            event_id: eventId,
        });
    }

    if (platforms.includes("tiktok") && typeof window.ttq === "object") {
        window.ttq.track(
            "Search",
            {
                query: searchString,
                currency: normalizedCurrency,
                value,
                content_id: contentIds ? contentIds.join(",") : undefined,
                contents: contents?.map(item => ({
                    content_id: item.id,
                    content_name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    content_category: item.category
                })),
            },
            { event_id: eventId }
        );
    }

    if (platforms.includes("pinterest") && typeof window.pintrk === "function") {
        window.pintrk(
            "track",
            "search",
            {
                search_query: searchString,
                currency: normalizedCurrency,
                value,
                line_items: contents?.map(item => ({
                    product_id: item.id,
                    product_name: item.name,
                    product_price: item.price,
                    product_quantity: item.quantity,
                    product_category: item.category
                }))
            },
            { event_id: eventId }
        );
    }
};

export const trackSubscribe = (payload: SubscribePayload) => {
    if (!payload.hasConsented) {
        console.warn("[PixelFlow] Subscribe event blocked due to lack of consent.");
        return;
    }

    const { platforms, eventId, value, currency, predictedLtv, subscriptionTier, contentIds, contents } = payload;

    if (value !== undefined && !currency) {
        console.error("[PixelFlow] Error: 'currency' is required when 'value' is provided. Event trackSubscribe aborted.");
        return;
    }

    const normalizedCurrency = currency?.trim().toUpperCase();

    if (platforms.includes("meta") && typeof window.fbq === "function") {
        window.fbq(
            "track",
            "Subscribe",
            {
                currency: normalizedCurrency,
                value,
                predicted_ltv: predictedLtv,
                content_ids: contentIds,
                contents: contents?.map(item => ({
                    id: item.id,
                    quantity: item.quantity,
                    item_price: item.price
                })),
            },
            { eventID: eventId }
        );
    }

    if (platforms.includes("google") && typeof window.gtag === "function") {
        window.gtag("event", "subscribe", {
            currency: normalizedCurrency,
            value,
            tier: subscriptionTier,
            items: contents?.map(item => ({
                item_id: item.id,
                item_name: item.name,
                price: item.price,
                quantity: item.quantity,
                item_category: item.category
            })),
            event_id: eventId,
        });
    }

    if (platforms.includes("tiktok") && typeof window.ttq === "object") {
        window.ttq.track(
            "Subscribe",
            {
                currency: normalizedCurrency,
                value,
                content_category: subscriptionTier,
                content_id: contentIds ? contentIds.join(",") : undefined,
                contents: contents?.map(item => ({
                    content_id: item.id,
                    content_name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    content_category: item.category
                })),
            },
            { event_id: eventId }
        );
    }

    if (platforms.includes("pinterest") && typeof window.pintrk === "function") {
        window.pintrk(
            "track",
            "custom",
            {
                event_name: "Subscribe",
                currency: normalizedCurrency,
                value,
                subscription_tier: subscriptionTier,
                line_items: contents?.map(item => ({
                    product_id: item.id,
                    product_name: item.name,
                    product_price: item.price,
                    product_quantity: item.quantity,
                    product_category: item.category
                }))
            },
            { event_id: eventId }
        );
    }
};

export const trackViewContent = (payload: ViewContentPayload) => {
    if (!payload.hasConsented) {
        console.warn("[PixelFlow] ViewContent event blocked due to lack of consent.");
        return;
    }

    const { platforms, eventId, value, currency, contentIds, contents, contentType } = payload;

    if (value !== undefined && !currency) {
        console.error("[PixelFlow] Error: 'currency' is required when 'value' is provided. Event trackViewContent aborted.");
        return;
    }

    const normalizedCurrency = currency?.trim().toUpperCase();

    if (platforms.includes("meta") && typeof window.fbq === "function") {
        window.fbq(
            "track",
            "ViewContent",
            {
                currency: normalizedCurrency,
                value,
                content_ids: contentIds,
                content_type: contentType,
                content_name: contents?.length === 1 ? contents[0].name : undefined,
                content_category: contents?.length === 1 ? contents[0].category : undefined,
                contents: contents?.map(item => ({
                    id: item.id,
                    quantity: item.quantity,
                    item_price: item.price
                })),
            },
            { eventID: eventId }
        );
    }

    if (platforms.includes("google") && typeof window.gtag === "function") {
        window.gtag("event", "view_item", {
            currency: normalizedCurrency,
            value,
            items: contents?.map(item => ({
                item_id: item.id,
                item_name: item.name,
                price: item.price,
                quantity: item.quantity,
                item_category: item.category
            })),
            event_id: eventId,
        });
    }

    if (platforms.includes("tiktok") && typeof window.ttq === "object") {
        window.ttq.track(
            "ViewContent",
            {
                currency: normalizedCurrency,
                value,
                content_type: contentType,
                content_id: contentIds ? contentIds.join(",") : undefined,
                contents: contents?.map(item => ({
                    content_id: item.id,
                    content_name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    content_category: item.category
                })),
            },
            { event_id: eventId }
        );
    }

    if (platforms.includes("pinterest") && typeof window.pintrk === "function") {
        window.pintrk(
            "track",
            "pagevisit",
            {
                currency: normalizedCurrency,
                value,
                line_items: contents?.map(item => ({
                    product_id: item.id,
                    product_name: item.name,
                    product_price: item.price,
                    product_quantity: item.quantity,
                    product_category: item.category
                }))
            },
            { event_id: eventId }
        );
    }
};

export const trackDonate = (payload: DonatePayload) => {
    if (!payload.hasConsented) {
        console.warn("[PixelFlow] Donate event blocked due to lack of consent.");
        return;
    }

    const { platforms, eventId, value, currency, donationCampaign } = payload;

    if (value !== undefined && !currency) {
        console.error("[PixelFlow] Error: 'currency' is required when 'value' is provided. Event trackDonate aborted.");
        return;
    }

    const normalizedCurrency = currency?.trim().toUpperCase();

    if (platforms.includes("meta") && typeof window.fbq === "function") {
        window.fbq(
            "track",
            "Donate",
            {
                currency: normalizedCurrency,
                value,
                content_name: donationCampaign,
            },
            { eventID: eventId }
        );
    }

    if (platforms.includes("google") && typeof window.gtag === "function") {
        window.gtag("event", "donate", {
            currency: normalizedCurrency,
            value,
            campaign_name: donationCampaign,
            event_id: eventId,
        });
    }

    if (platforms.includes("tiktok") && typeof window.ttq === "object") {
        window.ttq.track(
            "Donate",
            {
                currency: normalizedCurrency,
                value,
                content_name: donationCampaign,
            },
            { event_id: eventId }
        );
    }

    if (platforms.includes("pinterest") && typeof window.pintrk === "function") {
        window.pintrk(
            "track",
            "custom",
            {
                event_name: "Donate",
                currency: normalizedCurrency,
                value,
                product_name: donationCampaign,
            },
            { event_id: eventId }
        );
    }
};

export const trackApplicationApproval = (payload: ApplicationApprovalPayload) => {
    if (!payload.hasConsented) {
        console.warn("[PixelFlow] ApplicationApproval event blocked due to lack of consent.");
        return;
    }

    const { platforms, eventId, value, currency, applicationId, applicationType } = payload;

    if (value !== undefined && !currency) {
        console.error("[PixelFlow] Error: 'currency' is required when 'value' is provided. Event trackApplicationApproval aborted.");
        return;
    }

    const normalizedCurrency = currency?.trim().toUpperCase();

    if (platforms.includes("meta") && typeof window.fbq === "function") {
        window.fbq(
            "trackCustom",
            "ApplicationApproval",
            {
                currency: normalizedCurrency,
                value,
                application_id: applicationId,
                application_type: applicationType,
            },
            { eventID: eventId }
        );
    }

    if (platforms.includes("google") && typeof window.gtag === "function") {
        window.gtag("event", "application_approval", {
            currency: normalizedCurrency,
            value,
            application_id: applicationId,
            application_type: applicationType,
            event_id: eventId,
        });
    }

    if (platforms.includes("tiktok") && typeof window.ttq === "object") {
        window.ttq.track(
            "ApplicationApproval",
            {
                currency: normalizedCurrency,
                value,
                application_id: applicationId,
                application_type: applicationType,
            },
            { event_id: eventId }
        );
    }

    if (platforms.includes("pinterest") && typeof window.pintrk === "function") {
        window.pintrk(
            "track",
            "custom",
            {
                event_name: "ApplicationApproval",
                currency: normalizedCurrency,
                value,
                application_id: applicationId,
                application_type: applicationType,
            },
            { event_id: eventId }
        );
    }
};

export const trackCompleteRegistration = (payload: CompleteRegistrationPayload) => {
    if (!payload.hasConsented) {
        console.warn("[PixelFlow] CompleteRegistration event blocked due to lack of consent.");
        return;
    }

    const { platforms, eventId, value, currency, registrationMethod, status } = payload;

    if (value !== undefined && !currency) {
        console.error("[PixelFlow] Error: 'currency' is required when 'value' is provided. Event trackCompleteRegistration aborted.");
        return;
    }

    const normalizedCurrency = currency?.trim().toUpperCase();

    if (platforms.includes("meta") && typeof window.fbq === "function") {
        window.fbq(
            "track",
            "CompleteRegistration",
            {
                currency: normalizedCurrency,
                value,
                content_name: registrationMethod,
                status: status,
            },
            { eventID: eventId }
        );
    }

    if (platforms.includes("google") && typeof window.gtag === "function") {
        window.gtag("event", "sign_up", {
            method: registrationMethod,
            currency: normalizedCurrency,
            value,
            event_id: eventId,
        });
    }

    if (platforms.includes("tiktok") && typeof window.ttq === "object") {
        window.ttq.track(
            "CompleteRegistration",
            {
                currency: normalizedCurrency,
                value,
            },
            { event_id: eventId }
        );
    }

    if (platforms.includes("pinterest") && typeof window.pintrk === "function") {
        window.pintrk(
            "track",
            "signup",
            {
                currency: normalizedCurrency,
                value,
                lead_type: registrationMethod,
            },
            { event_id: eventId }
        );
    }
};

export const trackContact = (payload: ContactPayload) => {
    if (!payload.hasConsented) {
        console.warn("[PixelFlow] Contact event blocked due to lack of consent.");
        return;
    }

    const { platforms, eventId, value, currency, contactMethod } = payload;

    if (value !== undefined && !currency) {
        console.error("[PixelFlow] Error: 'currency' is required when 'value' is provided. Event Contact aborted.");
        return;
    }

    const normalizedCurrency = currency?.trim().toUpperCase();

    if (platforms.includes("meta") && typeof window.fbq === "function") {
        window.fbq(
            "track",
            "Contact",
            {
                currency: normalizedCurrency,
                value,
                content_name: contactMethod,
            },
            { eventID: eventId }
        );
    }

    if (platforms.includes("google") && typeof window.gtag === "function") {
        window.gtag("event", "contact", {
            method: contactMethod,
            currency: normalizedCurrency,
            value,
            event_id: eventId,
        });
    }

    if (platforms.includes("tiktok") && typeof window.ttq === "object") {
        window.ttq.track(
            "Contact",
            {
                currency: normalizedCurrency,
                value,
                content_name: contactMethod
            },
            { event_id: eventId }
        );
    }

    if (platforms.includes("pinterest") && typeof window.pintrk === "function") {
        window.pintrk(
            "track",
            "custom",
            {
                event_name: "Contact",
                currency: normalizedCurrency,
                value,
                lead_type: contactMethod
            },
            { event_id: eventId }
        );
    }
};

export const trackCustomizeProduct = (payload: CustomizeProductPayload) => {
    if (!payload.hasConsented) {
        console.warn("[PixelFlow] CustomizeProduct event blocked due to lack of consent.");
        return;
    }

    const { platforms, eventId, value, currency, contentIds, contents, customizationDetail } = payload;

    if (value !== undefined && !currency) {
        console.error("[PixelFlow] Error: 'currency' is required when 'value' is provided. Event CustomizeProduct aborted.");
        return;
    }

    const normalizedCurrency = currency?.trim().toUpperCase();

    if (platforms.includes("meta") && typeof window.fbq === "function") {
        window.fbq(
            "track",
            "CustomizeProduct",
            {
                currency: normalizedCurrency,
                value,
                content_name: customizationDetail,
                content_ids: contentIds,
                contents: contents?.map(item => ({
                    id: item.id,
                    quantity: item.quantity,
                    item_price: item.price
                })),
            },
            { eventID: eventId }
        );
    }

    if (platforms.includes("google") && typeof window.gtag === "function") {
        window.gtag("event", "customize_product", {
            customization: customizationDetail,
            currency: normalizedCurrency,
            value,
            items: contents?.map(item => ({
                item_id: item.id,
                item_name: item.name,
                price: item.price,
                quantity: item.quantity,
                item_category: item.category
            })),
            event_id: eventId,
        });
    }

    if (platforms.includes("tiktok") && typeof window.ttq === "object") {
        window.ttq.track(
            "CustomizeProduct",
            {
                currency: normalizedCurrency,
                value,
                content_name: customizationDetail,
                content_id: contentIds ? contentIds.join(",") : undefined,
                contents: contents?.map(item => ({
                    content_id: item.id,
                    content_name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    content_category: item.category
                })),
            },
            { event_id: eventId }
        );
    }

    if (platforms.includes("pinterest") && typeof window.pintrk === "function") {
        window.pintrk(
            "track",
            "custom",
            {
                event_name: "CustomizeProduct",
                currency: normalizedCurrency,
                value,
                product_name: customizationDetail,
                line_items: contents?.map(item => ({
                    product_id: item.id,
                    product_name: item.name,
                    product_price: item.price,
                    product_quantity: item.quantity,
                    product_category: item.category
                }))
            },
            { event_id: eventId }
        );
    }
};

export const trackFindLocation = (payload: FindLocationPayload) => {
    if (!payload.hasConsented) {
        console.warn("[PixelFlow] FindLocation event blocked due to lack of consent.");
        return;
    }

    const { platforms, eventId, value, currency, contentIds, contents, locationName } = payload;

    if (value !== undefined && !currency) {
        console.error("[PixelFlow] Error: 'currency' is required when 'value' is provided. Event FindLocation aborted.");
        return;
    }

    const normalizedCurrency = currency?.trim().toUpperCase();

    if (platforms.includes("meta") && typeof window.fbq === "function") {
        window.fbq(
            "track",
            "FindLocation",
            {
                currency: normalizedCurrency,
                value,
                search_string: locationName,
                content_ids: contentIds,
                contents: contents?.map(item => ({
                    id: item.id,
                    quantity: item.quantity,
                    item_price: item.price
                })),
            },
            { eventID: eventId }
        );
    }

    if (platforms.includes("google") && typeof window.gtag === "function") {
        window.gtag("event", "find_location", {
            location_name: locationName,
            currency: normalizedCurrency,
            value,
            items: contents?.map(item => ({
                item_id: item.id,
                item_name: item.name,
                price: item.price,
                quantity: item.quantity,
                item_category: item.category
            })),
            event_id: eventId,
        });
    }

    if (platforms.includes("tiktok") && typeof window.ttq === "object") {
        window.ttq.track(
            "FindLocation",
            {
                currency: normalizedCurrency,
                value,
                query: locationName,
                content_id: contentIds ? contentIds.join(",") : undefined,
                contents: contents?.map(item => ({
                    content_id: item.id,
                    content_name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    content_category: item.category
                })),
            },
            { event_id: eventId }
        );
    }

    if (platforms.includes("pinterest") && typeof window.pintrk === "function") {
        window.pintrk(
            "track",
            "custom",
            {
                event_name: "FindLocation",
                currency: normalizedCurrency,
                value,
                search_query: locationName,
                line_items: contents?.map(item => ({
                    product_id: item.id,
                    product_name: item.name,
                    product_price: item.price,
                    product_quantity: item.quantity,
                    product_category: item.category
                }))
            },
            { event_id: eventId }
        );
    }
};

export const trackSchedule = (payload: SchedulePayload) => {
    if (!payload.hasConsented) {
        console.warn("[PixelFlow] Schedule event blocked due to lack of consent.");
        return;
    }

    const { platforms, eventId, value, currency, scheduleType, scheduleDate } = payload;

    if (value !== undefined && !currency) {
        console.error("[PixelFlow] Error: 'currency' is required when 'value' is provided. Event Schedule aborted.");
        return;
    }

    const normalizedCurrency = currency?.trim().toUpperCase();

    if (platforms.includes("meta") && typeof window.fbq === "function") {
        window.fbq(
            "track",
            "Schedule",
            {
                currency: normalizedCurrency,
                value,
                content_name: scheduleType,
            },
            { eventID: eventId }
        );
    }

    if (platforms.includes("google") && typeof window.gtag === "function") {
        window.gtag("event", "schedule", {
            appointment_type: scheduleType,
            appointment_date: scheduleDate,
            currency: normalizedCurrency,
            value,
            event_id: eventId,
        });
    }

    if (platforms.includes("tiktok") && typeof window.ttq === "object") {
        window.ttq.track(
            "Schedule",
            {
                currency: normalizedCurrency,
                value,
                content_name: scheduleType,
                schedule_date: scheduleDate,
            },
            { event_id: eventId }
        );
    }

    if (platforms.includes("pinterest") && typeof window.pintrk === "function") {
        window.pintrk(
            "track",
            "custom",
            {
                event_name: "Schedule",
                currency: normalizedCurrency,
                value,
                lead_type: scheduleType,
                schedule_date: scheduleDate,
            },
            { event_id: eventId }
        );
    }
};

export const trackLead = (payload: LeadPayload) => {
    if (!payload.hasConsented) {
        console.warn("[PixelFlow] Lead event blocked due to lack of consent.");
        return;
    }

    const { platforms, eventId, value, currency, leadType } = payload;

    if (value !== undefined && !currency) {
        console.error("[PixelFlow] Error: 'currency' is required when 'value' is provided. Event Lead aborted.");
        return;
    }

    const normalizedCurrency = currency?.trim().toUpperCase();

    if (platforms.includes("meta") && typeof window.fbq === "function") {
        window.fbq(
            "track",
            "Lead",
            {
                currency: normalizedCurrency,
                value,
                content_name: leadType
            },
            { eventID: eventId }
        );
    }

    if (platforms.includes("google") && typeof window.gtag === "function") {
        window.gtag("event", "generate_lead", {
            currency: normalizedCurrency,
            value,
            lead_type: leadType,
            event_id: eventId,
        });
    }

    if (platforms.includes("tiktok") && typeof window.ttq === "object") {
        window.ttq.track(
            "SubmitForm",
            {
                currency: normalizedCurrency,
                value,
                content_name: leadType
            },
            { event_id: eventId }
        );
    }

    if (platforms.includes("pinterest") && typeof window.pintrk === "function") {
        window.pintrk(
            "track",
            "lead",
            {
                currency: normalizedCurrency,
                value,
                lead_type: leadType
            },
            { event_id: eventId }
        );
    }
};

export const trackStartTrial = (payload: StartTrialPayload) => {
    if (!payload.hasConsented) {
        console.warn("[PixelFlow] StartTrial event blocked due to lack of consent.");
        return;
    }

    const { platforms, eventId, value, currency, trialTier, predictedLtv, contentIds, contents, contentType } = payload;

    if (value !== undefined && !currency) {
        console.error("[PixelFlow] Error: 'currency' is required when 'value' is provided. Event StartTrial aborted.");
        return;
    }

    const normalizedCurrency = currency?.trim().toUpperCase();

    if (platforms.includes("meta") && typeof window.fbq === "function") {
        window.fbq(
            "track",
            "StartTrial",
            {
                currency: normalizedCurrency,
                value,
                predicted_ltv: predictedLtv,
                content_name: trialTier,
                content_ids: contentIds,
                content_type: contentType,
                contents: contents?.map(item => ({ id: item.id, quantity: item.quantity, item_price: item.price })),
            },
            { eventID: eventId }
        );
    }

    if (platforms.includes("google") && typeof window.gtag === "function") {
        window.gtag("event", "start_trial", {
            currency: normalizedCurrency,
            value,
            predicted_ltv: predictedLtv,
            trial_tier: trialTier,
            items: contents?.map(item => ({ item_id: item.id, item_name: item.name, price: item.price, quantity: item.quantity, item_category: item.category })),
            event_id: eventId,
        });
    }

    if (platforms.includes("tiktok") && typeof window.ttq === "object") {
        window.ttq.track(
            "StartTrial",
            {
                currency: normalizedCurrency,
                value,
                content_name: trialTier,
                predicted_ltv: predictedLtv,
                content_id: contentIds ? contentIds.join(",") : undefined,
                content_type: contentType,
                contents: contents?.map(item => ({ content_id: item.id, content_name: item.name, quantity: item.quantity, price: item.price, content_category: item.category }))
            },
            { event_id: eventId }
        );
    }

    if (platforms.includes("pinterest") && typeof window.pintrk === "function") {
        window.pintrk(
            "track",
            "custom",
            {
                event_name: "StartTrial",
                currency: normalizedCurrency,
                value,
                lead_type: trialTier,
                predicted_ltv: predictedLtv,
                line_items: contents?.map(item => ({ product_id: item.id, product_name: item.name, product_price: item.price, product_quantity: item.quantity, product_category: item.category })),
            },
            { event_id: eventId }
        );
    }
};

export const trackSubmitApplication = (payload: SubmitApplicationPayload) => {
    if (!payload.hasConsented) {
        console.warn("[PixelFlow] SubmitApplication event blocked due to lack of consent.");
        return;
    }

    const { platforms, eventId, value, currency, applicationType, applicationId } = payload;

    if (value !== undefined && !currency) {
        console.error("[PixelFlow] Error: 'currency' is required when 'value' is provided. Event SubmitApplication aborted.");
        return;
    }

    const normalizedCurrency = currency?.trim().toUpperCase();

    if (platforms.includes("meta") && typeof window.fbq === "function") {
        window.fbq(
            "track",
            "SubmitApplication",
            {
                currency: normalizedCurrency,
                value,
                content_name: applicationType
            },
            { eventID: eventId }
        );
    }

    if (platforms.includes("google") && typeof window.gtag === "function") {
        window.gtag("event", "submit_application", {
            currency: normalizedCurrency,
            value,
            application_type: applicationType,
            application_id: applicationId,
            event_id: eventId,
        });
    }

    if (platforms.includes("tiktok") && typeof window.ttq === "object") {
        window.ttq.track(
            "SubmitApplication",
            {
                currency: normalizedCurrency,
                value,
                content_name: applicationType,
                application_id: applicationId
            },
            { event_id: eventId }
        );
    }

    if (platforms.includes("pinterest") && typeof window.pintrk === "function") {
        window.pintrk(
            "track",
            "custom",
            {
                event_name: "SubmitApplication",
                currency: normalizedCurrency,
                value,
                lead_type: applicationType,
                application_id: applicationId
            },
            { event_id: eventId }
        );
    }
};

export const trackRemoveFromCart = (payload: RemoveFromCartPayload) => {
    if (!payload.hasConsented) {
        console.warn("[PixelFlow] RemoveFromCart event blocked due to lack of consent.");
        return;
    }

    const { platforms, eventId, value, currency, contentIds, contents, contentType } = payload;

    if (value !== undefined && !currency) {
        console.error("[PixelFlow] Error: 'currency' is required when 'value' is provided. Event RemoveFromCart aborted.");
        return;
    }

    const normalizedCurrency = currency?.trim().toUpperCase();

    if (platforms.includes("meta") && typeof window.fbq === "function") {
        window.fbq(
            "trackCustom",
            "RemoveFromCart",
            {
                currency: normalizedCurrency,
                value,
                content_ids: contentIds,
                content_type: contentType,
                contents: contents?.map(item => ({
                    id: item.id,
                    quantity: item.quantity,
                    item_price: item.price
                }))
            },
            { eventID: eventId }
        );
    }

    if (platforms.includes("google") && typeof window.gtag === "function") {
        window.gtag("event", "remove_from_cart", { 
            currency: normalizedCurrency,
            value,
            items: contents?.map(item => ({
                item_id: item.id,
                item_name: item.name,
                price: item.price,
                quantity: item.quantity,
                item_category: item.category
            })),
            event_id: eventId,
        });
    }

    if (platforms.includes("tiktok") && typeof window.ttq === "object") {
        window.ttq.track(
            "RemoveFromCart",
            {
                currency: normalizedCurrency,
                value,
                content_id: contentIds ? contentIds.join(",") : undefined,
                content_type: contentType,
                contents: contents?.map(item => ({
                    content_id: item.id,
                    content_name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    content_category: item.category
                }))
            },
            { event_id: eventId }
        );
    }

    if (platforms.includes("pinterest") && typeof window.pintrk === "function") {
        window.pintrk(
            "track",
            "custom",
            {
                event_name: "RemoveFromCart",
                currency: normalizedCurrency,
                value,
                line_items: contents?.map(item => ({
                    product_id: item.id,
                    product_name: item.name,
                    product_price: item.price,
                    product_quantity: item.quantity,
                    product_category: item.category
                }))
            },
            { event_id: eventId }
        );
    }
};

export const trackLogin = (payload: LoginPayload) => {
    if (!payload.hasConsented) {
        console.warn("[PixelFlow] Login event blocked due to lack of consent.");
        return;
    }

    const { platforms, eventId, value, currency, loginMethod } = payload;

    if (value !== undefined && !currency) {
        console.error("[PixelFlow] Error: 'currency' is required when 'value' is provided. Event Login aborted.");
        return;
    }

    const normalizedCurrency = currency?.trim().toUpperCase();

    if (platforms.includes("meta") && typeof window.fbq === "function") {
        window.fbq(
            "trackCustom",
            "Login",
            {
                currency: normalizedCurrency,
                value,
                content_name: loginMethod
            },
            { eventID: eventId }
        );
    }

    if (platforms.includes("google") && typeof window.gtag === "function") {
        window.gtag("event", "login", { 
            method: loginMethod,
            currency: normalizedCurrency,
            value,
            event_id: eventId,
        });
    }

    if (platforms.includes("tiktok") && typeof window.ttq === "object") {
        window.ttq.track(
            "Login",
            {
                currency: normalizedCurrency,
                value,
                content_name: loginMethod
            },
            { event_id: eventId }
        );
    }

    if (platforms.includes("pinterest") && typeof window.pintrk === "function") {
        window.pintrk(
            "track",
            "custom",
            {
                event_name: "Login",
                currency: normalizedCurrency,
                value,
                lead_type: loginMethod
            },
            { event_id: eventId }
        );
    }
};

export const trackShare = (payload: SharePayload) => {
    if (!payload.hasConsented) {
        console.warn("[PixelFlow] Share event blocked due to lack of consent.");
        return;
    }

    const { platforms, eventId, value, currency, contentIds, contents, contentType, shareMethod } = payload;

    if (value !== undefined && !currency) {
        console.error("[PixelFlow] Error: 'currency' is required when 'value' is provided. Event Share aborted.");
        return;
    }

    const normalizedCurrency = currency?.trim().toUpperCase();

    if (platforms.includes("meta") && typeof window.fbq === "function") {
        window.fbq(
            "track",
            "Share", 
            {
                currency: normalizedCurrency,
                value,
                content_ids: contentIds,
                content_type: contentType,
                content_name: shareMethod, 
                contents: contents?.map(item => ({
                    id: item.id,
                    quantity: item.quantity,
                    item_price: item.price
                }))
            },
            { eventID: eventId }
        );
    }

    if (platforms.includes("google") && typeof window.gtag === "function") {
        window.gtag("event", "share", { 
            method: shareMethod,
            content_type: contentType,
            item_id: contentIds ? contentIds[0] : undefined, 
            currency: normalizedCurrency,
            value,
            items: contents?.map(item => ({
                item_id: item.id,
                item_name: item.name,
                price: item.price,
                quantity: item.quantity,
                item_category: item.category
            })),
            event_id: eventId,
        });
    }

    if (platforms.includes("tiktok") && typeof window.ttq === "object") {
        window.ttq.track(
            "Share", 
            {
                currency: normalizedCurrency,
                value,
                content_type: contentType,
                content_name: shareMethod,
                content_id: contentIds ? contentIds.join(",") : undefined,
                contents: contents?.map(item => ({
                    content_id: item.id,
                    content_name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    content_category: item.category
                }))
            },
            { event_id: eventId }
        );
    }

    if (platforms.includes("pinterest") && typeof window.pintrk === "function") {
        window.pintrk(
            "track",
            "custom",
            {
                event_name: "Share",
                currency: normalizedCurrency,
                value,
                lead_type: shareMethod,
                line_items: contents?.map(item => ({
                    product_id: item.id,
                    product_name: item.name,
                    product_price: item.price,
                    product_quantity: item.quantity,
                    product_category: item.category
                }))
            },
            { event_id: eventId }
        );
    }
};