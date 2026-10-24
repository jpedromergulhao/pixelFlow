import { PixelFlowConfig } from "@jpmergulhao/pixelflow-types";
import MetaPixel from "./components/MetaPixel";
import PinterestTag from "./components/PinterestTag";
import GoogleAnalytics from "./components/GoogleAnalytics";
import TikTokPixel from "./components/TikTokPixel";

export const PixelFlowNextInit = ({ config }: { config: PixelFlowConfig }) => {
    return (
        <>
            {config.metaId && <MetaPixel metaId={config.metaId} />}
            {config.pinterestId && <PinterestTag pinterestId={config.pinterestId} />}
            {config.tiktokId && <TikTokPixel tiktokId={config.tiktokId} />}
            {config.googleId && <GoogleAnalytics googleId={config.googleId} />}
        </>
    );
};