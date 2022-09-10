export interface PaypalOrderInterface {
  create_time: Date;
  id: string;
  intent: string;
  links: Link[];
  payer: Pay;
  payment_source: PaymentSource;
  purchase_units: PurchaseUnit[];
  status: string;
  update_time: Date;
}

export interface PaypalOrderResponseBody {
  id: string;
  status:
    | "COMPLETED"
    | "SAVED"
    | "APPROVED"
    | "VOIDED"
    | "PAYER_ACTION_REQUIRED";
}

interface Link {
  href: string;
  method: string;
  rel: string;
}

interface Pay {
  account_id?: string;
  address: PayerAddress;
  email_address: string;
  name: PayerName;
  payer_id?: string;
}

interface PayerAddress {
  country_code: string;
}

interface PayerName {
  given_name: string;
  surname: string;
}

interface PaymentSource {
  paypal: Pay;
}

interface PurchaseUnit {
  amount: Amount;
  payee: Payee;
  payments: Payments;
  reference_id: string;
  shipping: Shipping;
  soft_descriptor: string;
}

interface Amount {
  currency_code: string;
  value: string;
}

interface Payee {
  email_address: string;
  merchant_id: string;
}

interface Payments {
  captures: Capture[];
}

interface Capture {
  amount: Amount;
  create_time: Date;
  final_capture: boolean;
  id: string;
  links: Link[];
  seller_protection: SellerProtection;
  seller_receivable_breakdown: SellerReceivableBreakdown;
  status: string;
  update_time: Date;
}

interface SellerProtection {
  dispute_categories: string[];
  status: string;
}

interface SellerReceivableBreakdown {
  gross_amount: Amount;
  net_amount: Amount;
  paypal_fee: Amount;
}

interface Shipping {
  address: ShippingAddress;
  name: ShippingName;
}

interface ShippingAddress {
  address_line_1: string;
  address_line_2: string;
  admin_area_1: string;
  admin_area_2: string;
  country_code: string;
  postal_code: string;
}

interface ShippingName {
  full_name: string;
}
