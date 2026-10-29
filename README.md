# PixelFlow

PixelFlow is an open-source Omnichannel Tracking Hub designed to simplify and unify the integration of marketing events across web applications and e-commerce platforms. 

Instead of dealing with the complexity and particularities of manually configuring distinct scripts and Conversion APIs (CAPI) for each social network, PixelFlow offers a single, standardized TypeScript interface. With a single method, your application tracks user interactions—such as product views, add-to-carts, and purchases—and automatically distributes them to the leading advertising platforms on the market (Meta, Google Analytics 4, TikTok, and Pinterest).

The library was built with a strict focus on **Hybrid Architecture**. It seamlessly combines browser-side tracking (Client-side) with server-side event firing (Conversions APIs), implementing automatic deduplication and Isomorphism. This approach mitigates data loss caused by AdBlockers and strict cookie tracking preventions (like Safari's ITP), ensuring your conversion funnel is measured with absolute accuracy while remaining compliant with privacy laws (GDPR/LGPD).

## Why is Event Instrumentation Essential?

Properly mapped events are the fuel for paid traffic in any sales or service-oriented application. By adopting PixelFlow, you empower your marketing team to:
- Measure Return on Ad Spend (ROAS) using real revenue data.
- Feed social media Artificial Intelligence algorithms for automatic campaign optimization.
- Build advanced custom audiences (Lookalike Audiences and Dynamic Retargeting).
- Analyze conversion bottlenecks to understand exactly where users drop off in your funnel.

## Integration Prerequisites

To use the PixelFlow ecosystem, you need active accounts on your target advertising platforms (Meta Ads Manager, Google Analytics, Pinterest Ads, or TikTok Ads Manager). You will need to extract the **Pixel IDs** (for Client-side) and **API Access Tokens** (for Server-side) directly from each platform's dashboard.

*In the following pages of this documentation, we provide direct links and guides to help you configure and extract these IDs and Access Tokens.*

> **Note on data propagation:** After completing the PixelFlow integration in your application, the first fired events may take up to 24 hours to reflect in the Ad Manager dashboards (especially for Pinterest and TikTok) due to the internal processing time of these platforms' servers.

## Supported Platforms (v1.0.0)

Currently in version 1.0.0, the library fully supports the four major tracking platforms utilized by modern e-commerces and SaaS applications:

### 1. Google Analytics 4 (GA4)
- **Client-Side (gtag.js):** Standard browser tracking for page views, user journeys, and standard e-commerce events.
- **Measurement Protocol (Server-Side):** When your backend detects a confirmed payment, the `@pixelflow/server` package makes an HTTP request directly to Google Analytics servers. This ensures the `purchase` conversion is registered with 100% accuracy, bypassing AdBlockers and without relying on the user keeping the "Thank You" page open.

### 2. Meta (Facebook/Instagram)
- **Meta Pixel (Client-Side):** The standard browser library that tracks visitor activity from Meta ads. It uses first-party cookies to match your website visitors with their respective Facebook accounts, allowing you to build retargeting flows and analyze user actions in the Meta Events Manager.
- **Conversions API / CAPI (Server-Side):** The backend counterpart that securely sends highly reliable server events directly to Meta. PixelFlow handles the required SHA-256 data hashing (emails, phone numbers) natively before sending, maximizing your Event Match Quality (EMQ).

### 3. Pinterest
- **Pinterest Tag (Client-Side):** Tracks user actions on your website after interacting with a Pin. Crucial for understanding organic and paid engagement on Pinterest.
- **Pinterest Conversions API (Server-Side):** Ensures server-to-server visibility for critical bottom-of-funnel events (like `checkout` and `sign_up`), bypassing browser limitations and formatting currency and catalog data exactly as Pinterest demands.

### 4. TikTok
- **TikTok Pixel (Client-Side):** Captures browser events to measure the impact of your TikTok campaigns, optimizing ad delivery to users most likely to convert.
- **TikTok Events API (Server-Side):** Shares website visitor events directly from your server to TikTok. PixelFlow automatically standardizes the payload and hashes sensitive customer data to ensure compliance and high match rates.

## Package Structure (Modular Architecture)

PixelFlow is distributed through a Monorepo architecture with scoped packages (`@jpmergulhao/*`). This modularity guarantees that your application only bundles the code strictly necessary for its execution environment (Browser or Server), keeping your final build incredibly lightweight.

The ecosystem consists of four independent packages:

- **`@jpmergulhao/pixelflow-client`**: 100% Browser-focused. Responsible for injecting the base tags and firing Client-Side events. This package uses the *Subpath Exports* pattern to offer optimized initializers depending on your framework (providing, for example, exclusive tools for Next.js).
- **`@jpmergulhao/pixelflow-react`**: React-specific bindings. Exposes the `<PixelFlowProvider>` and the `usePixelFlow` hook to handle automatic Dependency Injection (handling LGPD consent and active platforms natively across all your components).
- **`@jpmergulhao/pixelflow-server`**: 100% Server-focused. Responsible for direct communication with Conversions APIs (CAPI). It relies on the native `Web Crypto API` to perform SHA-256 hashing of sensitive data, making it fully compatible with modern environments like Next.js Edge Functions, Cloudflare Workers, and Node.js.
- **`@jpmergulhao/pixelflow-types`**: The TypeScript core of the library. It is a universal package imported natively by both the Frontend and Backend to ensure data integrity and true Isomorphism.

## Installation and Usage

You can install the modules that make sense for your application stack using your favorite package manager:

```bash
# For a full-stack Next.js/React application:
npm install @jpmergulhao/pixelflow-client @jpmergulhao/pixelflow-react @jpmergulhao/pixelflow-server
```

Importing is safely categorized by execution environment:

**Frontend (Browser / React):**
```typescript
import { usePixelFlow } from '@jpmergulhao/pixelflow-react';

// Inside a React component
const { trackAddToCart } = usePixelFlow();
```

**Backend (Server / Webhooks):**
```typescript
import { PixelFlowServer } from '@jpmergulhao/pixelflow-server';

// Inside your API Route / Server Action
const pixelFlow = new PixelFlowServer({ /* credentials */ });
await pixelFlow.trackPurchase(payload, userData);
```

## License

This project is licensed under the [MIT License](LICENSE).