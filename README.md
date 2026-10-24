# PixelFlow

**PixelFlow** is an open-source Omnichannel Tracking Hub designed to simplify and unify the integration of marketing events in web applications and e-commerces. 

Instead of dealing with the complexity of manually configuring scripts and distinct Conversion APIs (CAPI) for each social network, PixelFlow provides a single, standardized TypeScript interface. With a single method, your application tracks user interactions and automatically distributes them to the market's leading ad platforms (**Meta, Google Analytics 4, TikTok, and Pinterest**).

The library is built around a **Hybrid Architecture**. It combines browser tracking (Client-Side) with server-side event dispatching (Conversion APIs), implementing automatic deduplication to mitigate data loss caused by AdBlockers and cookie restrictions (like Safari's ITP).

## Package Structure (Modular Architecture)

The ecosystem is distributed via a Monorepo into three independent packages, ensuring your application only loads the necessary code for its execution environment:

*   **`@jpmergulhao/pixelflow-client`**: 100% focused on the browser. Responsible for injecting base tags and dispatching events on the Client-Side. It uses the *Subpath Exports* pattern to provide universal initializers or optimized components (such as native components for Next.js).
*   **`@jpmergulhao/pixelflow-server`**: 100% focused on the Server (Node.js). Responsible for direct communication with Conversion APIs (CAPI) and sensitive data cryptography (SHA-256).
*   **`@jpmergulhao/pixelflow-types`**: The TypeScript core. It is natively imported by both Front and Back to ensure the integrity of the dispatched data. *Note: You will rarely need to interact directly with this package, as typings are automatically inferred by your IDE.*

## Installation

Install the necessary modules for your application using your preferred package manager:

```bash
npm install @jpmergulhao/pixelflow-client @jpmergulhao/pixelflow-server
```

## Initialization (Base Scripts Injection)

Before dispatching any event, it is mandatory to initialize PixelFlow to inject the base tracking tags.

### Next.js (App Router / Pages Router)

Import the optimized `<PixelFlowNextInit/>` component into your root layout file (e.g., `layout.tsx`):

```tsx
import { PixelFlowNextInit } from "@jpmergulhao/pixelflow-client/next";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PixelFlowNextInit 
          config={{ 
            googleId: process.env.NEXT_PUBLIC_GA4_ID, 
            metaId: process.env.NEXT_PUBLIC_META_ID, 
            pinterestId: process.env.NEXT_PUBLIC_PINTEREST_ID, 
            tiktokId: process.env.NEXT_PUBLIC_TIKTOK_ID 
          }}
        />
        {children}
      </body>
    </html>
  );
}
```

### Other Stacks (React, Vue, Angular, Vanilla JS)

For Single Page Applications or Vanilla projects, use the universal injection function in the main lifecycle of the application (e.g., `useEffect` or `onMounted`).

```tsx
import { initPixelFlow } from "@jpmergulhao/pixelflow-client";

// Example in pure React (Vite / CRA)
useEffect(() => {
  initPixelFlow({
    metaId: "YOUR_META_ID",
    googleId: "YOUR_GA4_ID"
  });
}, []);
```

## Tracking Events

*(Under construction: The documentation for methods like `trackAddToCart`, `trackPurchase`, and their payload configurations will be added here shortly).*

## License

This project is licensed under the [MIT License](LICENSE).