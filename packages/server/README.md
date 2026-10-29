# @jpmergulhao/pixelflow-server

The `Server` package is designed to run in modern environments (Next.js Edge, Vercel Functions, Cloudflare Workers, and Node.js). It shares the **exact same payload signature** as the Frontend package, reducing the learning curve to zero while guaranteeing type safety.

### Backend Differentiators:

*   **Automatic Hashing:** You send the raw email or phone number, and the library natively converts it to `SHA-256` using the Web Crypto API (a strict requirement for Meta and TikTok).
*   **Platform Formatting:** Cents vs. Decimals, `items` arrays vs. `contents` arrays... the library adapts your payload to the exact standard expected by each platform behind the scenes.
*   **Parallel Routing:** Sends the event to all active platforms simultaneously without blocking the main thread.

## Initial Setup

Before firing events in your Backend (CAPI), you need to instantiate the `PixelFlowServer` by passing the **Secret IDs and Tokens** provided by the platforms. You only do this once in your route handler or webhook file.

You can overwrite any platform's API version via the `apiVersion` property (the fallback will always be the most recent stable version).

*   **`apiVersion`** (optional): Pass the specific API version you want to use. If omitted, the library defaults to the current stable version for that platform.
*   **`value` (decimal)**: To maintain identical compatibility with the Frontend package, **always send the value in decimal format** (e.g., `150.50`). If your payment gateway sends cents, divide by 100 before passing it to the library. PixelFlow will handle formatting it to the exact type each platform requires under the hood.

```typescript
import { PixelFlowServer } from "@jpmergulhao/pixelflow-server";

const pixelFlow = new PixelFlowServer({
    meta: {
        pixelId: process.env.META_PIXEL_ID!,
        accessToken: process.env.META_ACCESS_TOKEN!,
        apiVersion: "v23.0" // Optional (Default: v23.0)
    },
    pinterest: {
        advertiserId: process.env.PINTEREST_AD_ID!,
        accessToken: process.env.PINTEREST_ACCESS_TOKEN!,
        apiVersion: "v5" // Optional (Default: v5)
    },
    // tiktok: { ... },
    // google: { ... }
});
```

---

## Events

### `trackPurchase`
Used when a person completes a purchase. On the backend, it is ideal to fire this via Webhook from your payment gateway (Stripe, PayPal, etc.) the moment the order status changes to "Paid" or "Approved", ensuring 100% accuracy in your revenue data.

**Payload Arguments (Event):**
*   `platforms` (Required)
*   `hasConsented` (Required)
*   `eventId` (Required - Unique event identifier for deduplication)
*   `value` (Required - Total purchase value)
*   `currency` (Required - Currency, e.g., "USD")
*   `orderId` (Required - Order/Transaction number)
*   `contents` (Optional - List of purchased products)

**UserData Arguments (User):**
*   `clientIpAddress` (Required)
*   `clientUserAgent` (Required)
*   `email` (Optional - The library will auto-hash to SHA-256)
*   `phone` (Optional - The library will auto-hash to SHA-256)

```typescript
// Example usage upon receiving a payment confirmation in a Webhook
const handlePaymentApproved = async (txResult, req) => {
  await pixelFlow.trackPurchase(
    // 1. Event Data
    {
      eventId: txResult.transactionId,
      hasConsented: txResult.customer.hasConsented,
      platforms: ["meta", "pinterest", "tiktok", "google"],
      currency: "USD",
      value: txResult.totalInCents / 100, // Always send decimal format
      orderId: txResult.orderId,
      contents: txResult.items.map(item => ({
        id: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.priceInCents / 100
      }))
    },
    // 2. User Data (UserData)
    {
      clientIpAddress: req.headers.get("x-forwarded-for") ?? "0.0.0.0",
      clientUserAgent: req.headers.get("user-agent") ?? "",
      email: txResult.customer.email,
      phone: txResult.customer.phone
    }
  );
};
```

---

### `trackCompleteRegistration`
Used when a person completes a registration. On the backend, it is fired right after the user is successfully inserted into the database, guaranteeing that fake events aren't generated on the frontend by users who abandoned the form halfway.

**Payload Arguments (Event):**
*   `platforms` (Required)
*   `hasConsented` (Required)
*   `eventId` (Optional - Recommended for deduplication)
*   `value` (Optional - e.g., Estimated LTV value of a registered user)
*   `currency` (Required if value is sent)
*   `registrationMethod` (Optional - e.g., "email", "google", "invite")

**UserData Arguments (User):**
*   `clientIpAddress` (Required)
*   `clientUserAgent` (Required)
*   `email` (Optional - The library will auto-hash to SHA-256)
*   `phone` (Optional - The library will auto-hash to SHA-256)

```typescript
// Example usage after saving the user to the database (e.g., Prisma, Firebase)
const handleUserCreated = async (newUser, req) => {
  await pixelFlow.trackCompleteRegistration(
    // 1. Event Data
    {
      eventId: newUser.id,
      hasConsented: true,
      platforms: ["meta", "tiktok", "google"],
      registrationMethod: "email"
    },
    // 2. User Data (UserData)
    {
      clientIpAddress: req.headers.get("x-forwarded-for") ?? "0.0.0.0",
      clientUserAgent: req.headers.get("user-agent") ?? "",
      email: newUser.email // Send raw, the library handles SHA-256
    }
  );
};
```

---

### `trackLead`
Used when a person expresses interest in your product or service. Ideal for Landing Page capture forms processed on the server, guaranteeing a very high Match Rate when sending the validated lead's email directly to Meta and TikTok.

**Payload Arguments (Event):**
*   `platforms` (Required)
*   `hasConsented` (Required)
*   `eventId` (Optional)
*   `value` (Optional - Target CPA or historical value a lead has to the company)
*   `currency` (Required if value is sent)
*   `leadType` (Optional - e.g., "Ebook", "Newsletter", "Consulting")

**UserData Arguments (User):**
*   `clientIpAddress` (Required)
*   `clientUserAgent` (Required)
*   `email` (Required - The library will auto-hash to SHA-256)
*   `phone` (Optional - The library will auto-hash to SHA-256)

```typescript
// Example usage upon receiving form data via Next.js Server Action or API Route
const handleLeadCaptured = async (formData, req) => {
  await pixelFlow.trackLead(
    // 1. Event Data
    {
      eventId: `lead_${Date.now()}`,
      hasConsented: true,
      platforms: ["meta", "pinterest", "tiktok"],
      currency: "USD",
      value: 15.00, // Internal value the company attributes to each captured Lead
      leadType: "Download_Ebook_React"
    },
    // 2. User Data (UserData)
    {
      clientIpAddress: req.headers.get("x-forwarded-for") ?? "0.0.0.0",
      clientUserAgent: req.headers.get("user-agent") ?? "",
      email: formData.email,
      phone: formData.phone
    }
  );
};
```