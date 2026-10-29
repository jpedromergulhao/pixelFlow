import { useContext, useCallback } from "react";
import { PixelFlowContext } from "./PixelFlowProvider";
import * as VanillaEvents from "@jpmergulhao/pixelflow-client";
import {
    AddPaymentInfoPayload,
    AddToCartPayload,
    AddToWishlistPayload,
    DownloadPayload,
    InitiateCheckoutPayload,
    PurchasePayload,
    SearchPayload,
    SubscribePayload,
    ViewContentPayload,
    DonatePayload,
    ApplicationApprovalPayload,
    CompleteRegistrationPayload,
    ContactPayload,
    CustomizeProductPayload,
    FindLocationPayload,
    SchedulePayload,
    LeadPayload,
    StartTrialPayload,
    SubmitApplicationPayload,
    RemoveFromCartPayload,
    LoginPayload,
    SharePayload,
} from "@jpmergulhao/pixelflow-types";

type ReactPayload<T> = Omit<T, "hasConsented" | "platforms">;

export const usePixelFlow = () => {
    const context = useContext(PixelFlowContext);

    if (!context) {
        throw new Error(
            "usePixelFlow must be used within a PixelFlowProvider"
        );
    }

    const {
        hasConsented,
        platforms,
        setHasConsented,
        setPlatforms,
    } = context;

    const trackAddPaymentInfo = useCallback(
        (payload: ReactPayload<AddPaymentInfoPayload>) => {
            VanillaEvents.trackAddPaymentInfo({
                ...payload,
                hasConsented,
                platforms,
            });
        },
        [hasConsented, platforms]
    );

    const trackAddToCart = useCallback(
        (payload: ReactPayload<AddToCartPayload>) => {
            VanillaEvents.trackAddToCart({
                ...payload,
                hasConsented,
                platforms,
            });
        },
        [hasConsented, platforms]
    );

    const trackAddToWishlist = useCallback(
        (payload: ReactPayload<AddToWishlistPayload>) => {
            VanillaEvents.trackAddToWishlist({
                ...payload,
                hasConsented,
                platforms,
            });
        },
        [hasConsented, platforms]
    );

    const trackRemoveFromCart = useCallback(
        (payload: ReactPayload<RemoveFromCartPayload>) => {
            VanillaEvents.trackRemoveFromCart({
                ...payload,
                hasConsented,
                platforms,
            });
        },
        [hasConsented, platforms]
    );

    const trackViewContent = useCallback(
        (payload: ReactPayload<ViewContentPayload>) => {
            VanillaEvents.trackViewContent({
                ...payload,
                hasConsented,
                platforms,
            });
        },
        [hasConsented, platforms]
    );

    const trackInitiateCheckout = useCallback(
        (payload: ReactPayload<InitiateCheckoutPayload>) => {
            VanillaEvents.trackInitiateCheckout({
                ...payload,
                hasConsented,
                platforms,
            });
        },
        [hasConsented, platforms]
    );

    const trackPurchase = useCallback(
        (payload: ReactPayload<PurchasePayload>) => {
            VanillaEvents.trackPurchase({
                ...payload,
                hasConsented,
                platforms,
            });
        },
        [hasConsented, platforms]
    );

    const trackSearch = useCallback(
        (payload: ReactPayload<SearchPayload>) => {
            VanillaEvents.trackSearch({
                ...payload,
                hasConsented,
                platforms,
            });
        },
        [hasConsented, platforms]
    );

    const trackCustomizeProduct = useCallback(
        (payload: ReactPayload<CustomizeProductPayload>) => {
            VanillaEvents.trackCustomizeProduct({
                ...payload,
                hasConsented,
                platforms,
            });
        },
        [hasConsented, platforms]
    );

    const trackShare = useCallback(
        (payload: ReactPayload<SharePayload>) => {
            VanillaEvents.trackShare({
                ...payload,
                hasConsented,
                platforms,
            });
        },
        [hasConsented, platforms]
    );

    const trackFindLocation = useCallback(
        (payload: ReactPayload<FindLocationPayload>) => {
            VanillaEvents.trackFindLocation({
                ...payload,
                hasConsented,
                platforms,
            });
        },
        [hasConsented, platforms]
    );

    const trackLead = useCallback(
        (payload: ReactPayload<LeadPayload>) => {
            VanillaEvents.trackLead({
                ...payload,
                hasConsented,
                platforms,
            });
        },
        [hasConsented, platforms]
    );

    const trackContact = useCallback(
        (payload: ReactPayload<ContactPayload>) => {
            VanillaEvents.trackContact({
                ...payload,
                hasConsented,
                platforms,
            });
        },
        [hasConsented, platforms]
    );

    const trackCompleteRegistration = useCallback(
        (payload: ReactPayload<CompleteRegistrationPayload>) => {
            VanillaEvents.trackCompleteRegistration({
                ...payload,
                hasConsented,
                platforms,
            });
        },
        [hasConsented, platforms]
    );

    const trackLogin = useCallback(
        (payload: ReactPayload<LoginPayload>) => {
            VanillaEvents.trackLogin({
                ...payload,
                hasConsented,
                platforms,
            });
        },
        [hasConsented, platforms]
    );

    const trackSubmitApplication = useCallback(
        (payload: ReactPayload<SubmitApplicationPayload>) => {
            VanillaEvents.trackSubmitApplication({
                ...payload,
                hasConsented,
                platforms,
            });
        },
        [hasConsented, platforms]
    );

    const trackApplicationApproval = useCallback(
        (payload: ReactPayload<ApplicationApprovalPayload>) => {
            VanillaEvents.trackApplicationApproval({
                ...payload,
                hasConsented,
                platforms,
            });
        },
        [hasConsented, platforms]
    );

    const trackSchedule = useCallback(
        (payload: ReactPayload<SchedulePayload>) => {
            VanillaEvents.trackSchedule({
                ...payload,
                hasConsented,
                platforms,
            });
        },
        [hasConsented, platforms]
    );

    const trackSubscribe = useCallback(
        (payload: ReactPayload<SubscribePayload>) => {
            VanillaEvents.trackSubscribe({
                ...payload,
                hasConsented,
                platforms,
            });
        },
        [hasConsented, platforms]
    );

    const trackStartTrial = useCallback(
        (payload: ReactPayload<StartTrialPayload>) => {
            VanillaEvents.trackStartTrial({
                ...payload,
                hasConsented,
                platforms,
            });
        },
        [hasConsented, platforms]
    );

    const trackDonate = useCallback(
        (payload: ReactPayload<DonatePayload>) => {
            VanillaEvents.trackDonate({
                ...payload,
                hasConsented,
                platforms,
            });
        },
        [hasConsented, platforms]
    );

    const trackDownload = useCallback(
        (payload: ReactPayload<DownloadPayload>) => {
            VanillaEvents.trackDownload({
                ...payload,
                hasConsented,
                platforms,
            });
        },
        [hasConsented, platforms]
    );

    return {
        hasConsented,
        setHasConsented,
        platforms,
        setPlatforms,
        trackAddPaymentInfo,
        trackAddToCart,
        trackAddToWishlist,
        trackRemoveFromCart,
        trackViewContent,
        trackInitiateCheckout,
        trackPurchase,
        trackSearch,
        trackCustomizeProduct,
        trackShare,
        trackFindLocation,
        trackLead,
        trackContact,
        trackCompleteRegistration,
        trackLogin,
        trackSubmitApplication,
        trackApplicationApproval,
        trackSchedule,
        trackSubscribe,
        trackStartTrial,
        trackDonate,
        trackDownload,
    };
};