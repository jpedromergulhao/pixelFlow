import React, { createContext, useState, ReactNode } from "react";
import { TrackingPlatforms } from "@jpmergulhao/pixelflow-types";

interface PixelFlowContextData {
    hasConsented: boolean;
    platforms: TrackingPlatforms;
    setHasConsented: (status: boolean) => void;
    setPlatforms: (platforms: TrackingPlatforms) => void;
}

export const PixelFlowContext = createContext<PixelFlowContextData | undefined>(undefined);

export interface PixelFlowProviderProps {
    children: ReactNode;
    initialConsent?: boolean;
    initialPlatforms?: TrackingPlatforms;
}

export const PixelFlowProvider: React.FC<PixelFlowProviderProps> = ({
    children,
    initialConsent = false,
    initialPlatforms = ["meta", "google", "tiktok", "pinterest"]
}) => {
    const [hasConsented, setHasConsented] = useState<boolean>(initialConsent);
    const [platforms, setPlatforms] = useState<TrackingPlatforms>(initialPlatforms);

    return (
        <PixelFlowContext.Provider value={{ hasConsented, platforms, setHasConsented, setPlatforms }}>
            {children}
        </PixelFlowContext.Provider>
    );
};