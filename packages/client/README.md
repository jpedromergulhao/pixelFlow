# @jpmergulhao/pixelflow-client

The `Client` package is responsible for simplifying the injection of tracking scripts and managing event firing directly in the user's browser (Client-Side). It abstracts away the complex particularities of each ad platform into a unified API, enabling real-time tracking without the need for backend requests.

## 1. Initialization (Base Script Injection)

Before importing and firing any event, you must initialize PixelFlow so the base tracking tags are loaded into your application's `<head>`. After generating your Pixel/Tag IDs in the respective Ads Managers, choose the initialization method that fits your stack:

### Next.js (App Router / Pages Router)

For Next.js projects, PixelFlow provides an optimized component that leverages the native `next/script`, ensuring asynchronous loading without blocking page rendering.

Import and place the `<PixelFlowNextInit/>` component in your root layout file (e.g., `layout.tsx`):

```tsx
// app/layout.tsx (or layout.jsx)
import { PixelFlowNextInit } from "@jpmergulhao/pixelflow-client/next";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US">
      <body>
        <PixelFlowNextInit
          config={{
            metaId: "YOUR_META_ID",
            googleId: "YOUR_GA4_ID",
            // Only add the IDs for the platforms you intend to use
          }}
        />
        {children}
      </body>
    </html>
  );
}
```

### Other Stacks (Vanilla React, Vue, Angular, Vanilla JS)

For applications not using Next.js, PixelFlow exposes a universal Vanilla JS function. Import the `initPixelFlow` function and execute it during your application's main mounting lifecycle.

#### Vanilla React (Vite, CRA, etc.)
Initialization should occur only once when the main component mounts, using the `useEffect` hook.
```tsx
// src/App.tsx
import React, { useEffect } from "react";
import { initPixelFlow } from "@jpmergulhao/pixelflow-client";

export default function App() {
  useEffect(() => {
    initPixelFlow({
      metaId: "YOUR_META_ID",
      googleId: "YOUR_GA4_ID",
    });
  }, []); // Empty array ensures it runs only on mount

  return (
    <div>
      <h1>React App</h1>
    </div>
  );
}
```

#### Vue.js (Vue 3 with Composition API)
```html
<!-- src/App.vue -->
<script setup>
import { onMounted } from 'vue';
import { initPixelFlow } from '@jpmergulhao/pixelflow-client';

onMounted(() => {
  initPixelFlow({
    metaId: "YOUR_META_ID",
    tiktokId: "YOUR_TIKTOK_ID",
  });
});
</script>
```

#### Angular
Initialize inside the root component's `ngOnInit` lifecycle.
```typescript
// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { initPixelFlow } from '@jpmergulhao/pixelflow-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    initPixelFlow({
      metaId: "YOUR_META_ID",
      pinterestId: "YOUR_PINTEREST_ID",
    });
  }
}
```

#### Vanilla JS (HTML + Pure JavaScript)
If your project doesn't use a reactive framework, simply call the function in your main JavaScript entry point.
```javascript
// src/main.js or index.js
import { initPixelFlow } from "@jpmergulhao/pixelflow-client";

initPixelFlow({
  metaId: "YOUR_META_ID",
  googleId: "YOUR_GA4_ID",
});
```

---

## 2. Events Firing

Firing events directly through native platform SDKs involves dealing with different key mappings (e.g., `paymentType` vs `payment_type`) and missing events (e.g., Pinterest does not natively have an `AddPaymentInfo` event). This makes development tedious and error-prone.

PixelFlow silently resolves this architectural complexity under the hood. It maps the exact keys required by each platform and intelligently creates custom events to bypass platform limitations, ensuring no data is lost between them. 

### The Consent Lock (`hasConsented`)
PixelFlow is responsible for enforcing the Consent Lock. `hasConsented` is the first thing validated internally. If it is `false` or omitted, the event dies right there and logs a warning to the console. This is critical for LGPD/GDPR compliance.

---

### Sales Events
Events exclusively for tracking the sales pipeline and e-commerce actions.

#### `trackAddPaymentInfo`
Used when payment information is added during the checkout process.
* **Arguments:** `platforms`, `hasConsented`, `eventId` (Optional), `value` (Optional), `currency` (Required if value is sent), `paymentType` (Optional), `contentIds` (Optional), `contents` (Optional).

```typescript
import { trackAddPaymentInfo } from "@jpmergulhao/pixelflow-client";

const handlePaymentSelection = (paymentMethod: string) => {
  trackAddPaymentInfo({
    eventId: "order_987654321", // Crucial for CAPI deduplication
    hasConsented: true,         // LGPD/GDPR flag
    platforms: ["meta", "google", "tiktok", "pinterest"],
    currency: "BRL",
    value: 299.90,
    paymentType: paymentMethod, // e.g., "credit_card", "pix"
    contentIds: ["SKU-123", "SKU-456"],
    contents: [
      { id: "SKU-123", name: "Mechanical Keyboard", price: 199.90, quantity: 1 }
    ]
  });
};
```

#### `trackAddToCart`
Used when a product is added to the shopping cart.
* **Arguments:** `platforms`, `hasConsented`, `eventId` (Optional), `value` (Optional but highly recommended), `currency` (Required if value is sent), `contentType` (Optional), `contentIds` (Optional), `contents` (Optional).

```typescript
import { trackAddToCart } from "@jpmergulhao/pixelflow-client";

const handleAddToCart = (product) => {
  trackAddToCart({
    eventId: "evt_cart_884729",
    hasConsented: true,
    platforms: ["meta", "google", "tiktok", "pinterest"],
    currency: "USD",
    value: 199.90,
    contentType: "product",
    contentIds: ["SKU-123"],
    contents: [{ id: "SKU-123", name: "Mechanical Keyboard", price: 199.90, quantity: 1 }]
  });
};
```

#### `trackRemoveFromCart`
Used when a product is removed from the cart right before checkout.
* **Arguments:** Same as `trackAddToCart`.

#### `trackAddToWishlist`
Used when a product is saved to a wishlist.
* **Arguments:** Same as `trackAddToCart`.

#### `trackInitiateCheckout`
Used when a person enters the checkout flow before completing it. It's one of the most important funnel events, feeding "abandoned cart" remarketing campaigns. PixelFlow automatically calculates properties like `num_items` (required by Meta) based on the `contents` array.
* **Arguments:** Same as `trackAddToCart`.

```typescript
import { trackInitiateCheckout } from "@jpmergulhao/pixelflow-client";

const handleCheckoutStart = () => {
  trackInitiateCheckout({
    eventId: "evt_chk_123456",
    hasConsented: true,
    platforms: ["meta", "google", "tiktok", "pinterest"],
    currency: "BRL",
    value: 549.80,
    contentIds: ["SKU-123", "SKU-789"],
    contents: [ /* product items */ ]
  });
};
```

#### `trackPurchase`
Used when a purchase is successfully completed (Thank You Page).
* **Arguments:** `platforms`, `hasConsented`, `eventId`, `value`, `currency`, `orderId`, `contentType` (Optional), `contentIds` (Optional), `contents` (Optional).

#### `trackSearch`
Used when a search is performed on your site. Allows advertisers to create intent-based Custom Audiences.
* **Arguments:** `platforms`, `hasConsented`, `searchString`, `eventId` (Optional), `value` (Optional), `currency` (Required if value), `contentType` (Optional), `contentIds` (Optional), `contents` (Optional).

#### `trackSubscribe`
Used when a person starts a paid subscription. Crucial for SaaS businesses or paid newsletters.
* **Arguments:** `platforms`, `hasConsented`, `subscriptionTier` (Optional), `predictedLtv` (Optional), `eventId` (Optional), `value` (Optional), `currency` (Required if value), `contentIds` (Optional), `contents` (Optional).

#### `trackStartTrial`
Used when a person starts a free trial for a product or service.
* **Arguments:** `platforms`, `hasConsented`, `trialTier` (Optional), `predictedLtv` (Optional), `eventId` (Optional), `value` (Optional), `currency` (Required if value), `contentIds` (Optional), `contents` (Optional).

```typescript
import { trackStartTrial } from "@jpmergulhao/pixelflow-client";

const handleTrialStarted = (userPlan) => {
 trackStartTrial({
   eventId: "evt_trial_123999",
   hasConsented: true,
   platforms: ["meta", "google", "tiktok", "pinterest"],
   currency: "USD",
   value: 0.00, 
   predictedLtv: 1200.00, // SaaS Secret: Send the expected LTV (e.g., 12 months x $100)
   trialTier: "Advanced Plan - 14 Days Free",
   contentType: "product",
   contentIds: [userPlan.id],
   contents: [{ id: userPlan.id, name: userPlan.name, price: userPlan.monthlyPrice, quantity: 1 }]
  });
};
```

#### `trackViewContent`
Used when a key web page is visited (e.g., Product Detail Page - PDP). If the user views the product but doesn't add it to the cart, this event fuels dynamic retargeting ads.
* **Arguments:** Same as `trackAddToCart`.

#### `trackDownload`
Used when a file is downloaded (e.g., Whitepaper, Software).
* **Arguments:** `platforms`, `hasConsented`, `eventId`, `fileName` (Optional), `fileType` (Optional), `value` (Optional), `currency` (Required if value), `contentType` (Optional), `contentIds` (Optional), `contents` (Optional).

#### `trackDonate`
Used when a person donates funds to your organization.
* **Arguments:** `platforms`, `hasConsented`, `donationCampaign` (Optional), `eventId` (Optional), `value` (Optional), `currency` (Required if value).

---

### Lead Events
Events designed to capture lead generation behavior and user lifecycle milestones.

#### `trackLead`
The most valuable event for Inbound Marketing, B2B, and info-products. Fired when a signup or capture form is completed.
* **Arguments:** `platforms`, `hasConsented`, `leadType` (Optional), `eventId` (Optional), `value` (Optional - Virtual CPA), `currency` (Required if value).

```typescript
import { trackLead } from "@jpmergulhao/pixelflow-client";

const handleFormSubmission = () => {
  trackLead({
    eventId: "evt_lead_889900", // Matches CRM data in backend CAPI
    hasConsented: true,
    platforms: ["meta", "google", "tiktok", "pinterest"],
    currency: "USD",
    value: 25.00, // Virtual CPA Target
    leadType: "B2B_Demo_Request" 
  });
};
```

#### `trackCompleteRegistration`
When a registration form is completed (Account Creation).
* **Arguments:** `platforms`, `hasConsented`, `registrationMethod` (Optional), `status` (Optional), `eventId` (Optional), `value` (Optional), `currency` (Required if value).

#### `trackApplicationApproval`
Used when a user's application is approved (e.g., Credit Card, Loan, University Enrollment).
* **Arguments:** `platforms`, `hasConsented`, `applicationId` (Optional), `applicationType` (Optional), `eventId` (Optional), `value` (Optional), `currency` (Required if value).

#### `trackSubmitApplication`
Used when a person submits an application (before approval).
* **Arguments:** Same as `trackApplicationApproval`.

#### `trackContact`
Used when a person initiates contact via phone, SMS, email, or chat (e.g., Clicking a WhatsApp floating button).
* **Arguments:** `platforms`, `hasConsented`, `contactMethod` (Optional), `eventId` (Optional), `value` (Optional), `currency` (Required if value).

#### `trackSchedule`
Used when a person books an appointment to visit your location or schedule a call. Excellent for service companies, clinics, and car dealerships.
* **Arguments:** `platforms`, `hasConsented`, `scheduleType` (Optional), `scheduleDate` (Optional), `eventId` (Optional), `value` (Optional), `currency` (Required if value).

#### `trackCustomizeProduct`
Used when a person customizes a product (e.g., PC Builders, Custom Mugs, Jewelry).
* **Arguments:** `platforms`, `hasConsented`, `customizationDetail` (Optional), `eventId` (Optional), `value` (Optional), `currency` (Required if value), `contentIds` (Optional), `contents` (Optional).

#### `trackFindLocation`
Used when a person searches for a physical store location. Fantastic for Omnichannel companies (Click & Collect).
* **Arguments:** `platforms`, `hasConsented`, `locationName` (Optional), `eventId` (Optional), `value` (Optional), `currency` (Required if value), `contentIds` (Optional), `contents` (Optional).

#### `trackLogin`
Used when an existing user logs back into your platform.
* **Arguments:** `platforms`, `hasConsented`, `loginMethod` (Optional), `eventId` (Optional), `value` (Optional), `currency` (Required if value).

#### `trackShare`
Used when a user clicks a "Share" or "Copy Link" button for a product/content.
* **Arguments:** `platforms`, `hasConsented`, `shareMethod` (Optional), `eventId` (Optional), `value` (Optional), `currency` (Required if value), `contentIds` (Optional), `contents` (Optional).