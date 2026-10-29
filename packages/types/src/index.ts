export type TrackingPlatform = "meta" | "google" | "pinterest" | "tiktok";
export type TrackingPlatforms = TrackingPlatform[];
export type PaymentType = "credit_card" | "debit_card" | "paypal" | "pix" | "boleto" | "bank_transfer" | "crypto" | (string & {});
export type ContentType = "product" | "product_group";
export type FileType = "pdf" | "zip" | "csv" | "xlsx" | "docx" | "mp4" | "mp3" | "png" | "jpg" | "jpeg" | "app" | "exe" | (string & {});
export type Currency = "AED" | "AMD" | "ARS" | "AUD" | "AZN" | "BAM" | "BGN" | "BHD" | "BMD" | "BND" | "BOB" | "BRL" | "BSD" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CRC" | "CZK" | "DKK" | "DOP" | "EGP" | "EUR" | "FJD" | "GBP" | "GEL" | "GIP" | "HKD" | "HNL" | "HRK" | "HUF" | "IDR" | "ILS" | "INR" | "ISK" | "JMD" | "JPY" | "KGS" | "KRW" | "KWD" | "KZT" | "MAD" | "MDL" | "MOP" | "MXN" | "MYR" | "NOK" | "NZD" | "OMR" | "PAB" | "PEN" | "PHP" | "PKR" | "PLN" | "QAR" | "RON" | "RSD" | "RUB" | "SAR" | "SEK" | "SGD" | "THB" | "TRY" | "TWD" | "UAH" | "USD" | "UYU" | "VND" | "ZAR";
export type RegistrationType = "email" | "google" | "facebook" | "apple" | "github" | (string & {});
export type ContactType = "whatsapp" | "email" | "phone" | "chat" | "contact_form" | (string & {});
export type ShareType = "whatsapp" | "twitter" | "copy_link" | "email" | "facebook" | "instagram" | (string & {});

export interface ProductItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category?: string;
}

export interface PixelFlowConfig {
  metaId?: string;
  pinterestId?: string;
  googleId?: string;
  tiktokId?: string;
}

export interface BaseEvent {
  hasConsented: boolean;
  platforms: TrackingPlatforms;
  eventId?: string;
  currency?: Currency; 
  value?: number;
}

export interface BaseCommerceEvent extends BaseEvent {
  contentIds?: string[];
  contents?: ProductItem[];
  contentType?: ContentType;
}

export interface AddPaymentInfoPayload extends BaseCommerceEvent {
  paymentType?: PaymentType;
}

export interface AddToCartPayload extends BaseCommerceEvent { }

export interface RemoveFromCartPayload extends BaseCommerceEvent {}

export interface AddToWishlistPayload extends BaseCommerceEvent { }

export interface InitiateCheckoutPayload extends BaseCommerceEvent { }

export interface PurchasePayload extends BaseCommerceEvent {
  eventId: string;   
  currency: Currency;
  value: number;       
  orderId: string;     
}

export interface SharePayload extends BaseCommerceEvent {
  shareMethod?: string;
}

export interface ViewContentPayload extends BaseCommerceEvent { }

export interface SearchPayload extends BaseCommerceEvent {
  searchString: string;
}

export interface CustomizeProductPayload extends BaseCommerceEvent {
  customizationDetail?: string;
}

export interface FindLocationPayload extends BaseCommerceEvent {
  locationName?: string;
}

export interface DownloadPayload extends BaseCommerceEvent {
  fileName?: string;
  fileType?: FileType;
}

export interface SubscribePayload extends BaseCommerceEvent {
  subscriptionTier?: string;
  predictedLtv?: number;
}

export interface StartTrialPayload extends BaseCommerceEvent {
  trialTier?: string;
  predictedLtv?: number;
}

export interface SharePayload extends BaseCommerceEvent {
  shareMethod?: string;
}

export interface LoginPayload extends BaseEvent {
  loginMethod?: RegistrationType;
}

export interface DonatePayload extends BaseEvent {
  donationCampaign?: string;
}

export interface ApplicationApprovalPayload extends BaseEvent {
  applicationId?: string;
  applicationType?: string;
}

export interface CompleteRegistrationPayload extends BaseEvent {
  registrationMethod?: RegistrationType;
  status?: boolean;
}

export interface ContactPayload extends BaseEvent {
  contactMethod?: ContactType;
}

export interface LeadPayload extends BaseEvent {
  leadType?: string;
}

export interface SchedulePayload extends BaseEvent {
  scheduleType?: string;
  scheduleDate?: string;
}

export interface SubmitApplicationPayload extends BaseEvent {
  applicationId?: string;
  applicationType?: string;
}

export interface UserData {
  clientIpAddress?: string;
  clientUserAgent?: string;
  email?: string;
  phone?: string;
  fbc?: string;
  fbp?: string;
  ttp?: string;
  clientId?: string;
}