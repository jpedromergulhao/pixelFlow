# @jpmergulhao/pixelflow-react

The modern Front-end market is heavily dominated by React and Next.js. With this in mind, PixelFlow provides a fully customized Context Provider and Hook to make using the library's tracking methods in your React projects incredibly seamless.

This package leverages the **Dependency Injection** pattern to isolate repetitive configurations, such as `hasConsented` (for LGPD/GDPR compliance) and `platforms` (the active ad networks). 

By acting as an "Automatic Injector" for the base configuration, this package ensures you no longer need to pass the same boilerplate props every time you fire an event.

## 1. Global Setup (`PixelFlowProvider`)

You only need to wrap your application a **single time** at the root level. This is usually done in `_app.tsx` (Pages Router) or `layout.tsx` (App Router).

```tsx
import { PixelFlowProvider } from "@jpmergulhao/pixelflow-react";

export default function App({ Component, pageProps }) {
  return (
    <PixelFlowProvider 
      initialConsent={true} // Set this based on your Cookie Banner state
      initialPlatforms={["meta", "google", "tiktok", "pinterest"]}
    >
      <Component {...pageProps} />
    </PixelFlowProvider>
  );
}
```

## 2. Firing Events (`usePixelFlow`)

Once the provider is set up, you can import the `usePixelFlow` hook into any component. 

Notice how clean the implementation becomes! You **do not** need to pass `hasConsented` or `platforms` to the event payload. The Hook handles injecting them automatically behind the scenes.

```tsx
import { usePixelFlow } from "@jpmergulhao/pixelflow-react";

export function CheckoutButton() {
  const { trackPurchase } = usePixelFlow();

  const handlePaymentSuccess = () => {
    
    // Clean and strictly typed! 
    // The hook automatically injects 'hasConsented' and 'platforms'.
    trackPurchase({
      eventId: "ORDER-999",
      value: 150.00,
      currency: "USD",
      orderId: "ORD-999",
      contents: [
        {
          id: "PROD-01",
          name: "Awesome Product",
          price: 150.00,
          quantity: 1
        }
      ]
    });

  };

  return (
    <button onClick={handlePaymentSuccess}>
      Complete Purchase
    </button>
  );
}
```

Simple, elegant, and highly practical.