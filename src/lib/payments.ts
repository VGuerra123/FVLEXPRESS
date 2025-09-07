import { loadStripe } from '@stripe/stripe-js';

// Stripe configuration
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_demo');

// MercadoPago configuration (popular in Chile)
declare global {
  interface Window {
    MercadoPago: any;
  }
}

export interface PaymentItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: 'package' | 'subscription';
}

export interface PaymentData {
  items: PaymentItem[];
  total: number;
  currency: string;
  customerEmail?: string;
  customerName?: string;
}

// Stripe Payment Integration
export const processStripePayment = async (paymentData: PaymentData) => {
  try {
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe not loaded');

    // Create payment intent on your backend
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: paymentData.total * 100, // Convert to cents
        currency: paymentData.currency.toLowerCase(),
        items: paymentData.items,
        customer_email: paymentData.customerEmail,
      }),
    });

    const { client_secret } = await response.json();

    // Confirm payment
    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: {
          // Card element would be created in the component
        },
        billing_details: {
          name: paymentData.customerName,
          email: paymentData.customerEmail,
        },
      },
    });

    if (result.error) {
      throw new Error(result.error.message);
    }

    return {
      success: true,
      paymentIntent: result.paymentIntent,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Payment failed',
    };
  }
};

// MercadoPago Integration (Popular in Chile)
export const processMercadoPagoPayment = async (paymentData: PaymentData) => {
  try {
    // Initialize MercadoPago
    const mp = new window.MercadoPago('YOUR_PUBLIC_KEY', {
      locale: 'es-CL'
    });

    // Create preference
    const preference = {
      items: paymentData.items.map(item => ({
        title: item.name,
        unit_price: item.price,
        quantity: item.quantity,
        currency_id: 'CLP',
      })),
      payer: {
        email: paymentData.customerEmail,
        name: paymentData.customerName,
      },
      back_urls: {
        success: `${window.location.origin}/payment/success`,
        failure: `${window.location.origin}/payment/failure`,
        pending: `${window.location.origin}/payment/pending`,
      },
      auto_return: 'approved',
    };

    const response = await fetch('/api/mercadopago/create-preference', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preference),
    });

    const { init_point } = await response.json();
    
    // Redirect to MercadoPago
    window.location.href = init_point;

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Payment failed',
    };
  }
};

// WebPay Plus Integration (Transbank - Chile)
export const processWebPayPayment = async (paymentData: PaymentData) => {
  try {
    const response = await fetch('/api/webpay/create-transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: paymentData.total,
        session_id: `fv-${Date.now()}`,
        buy_order: `ORDER-${Date.now()}`,
        return_url: `${window.location.origin}/payment/webpay/return`,
        items: paymentData.items,
      }),
    });

    const { url, token } = await response.json();
    
    // Create form and submit to WebPay
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = url;
    
    const tokenInput = document.createElement('input');
    tokenInput.type = 'hidden';
    tokenInput.name = 'token_ws';
    tokenInput.value = token;
    
    form.appendChild(tokenInput);
    document.body.appendChild(form);
    form.submit();

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Payment failed',
    };
  }
};

// Khipu Integration (Popular in Chile)
export const processKhipuPayment = async (paymentData: PaymentData) => {
  try {
    const response = await fetch('/api/khipu/create-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: paymentData.total,
        currency: 'CLP',
        subject: `F&V Logistics - ${paymentData.items.length} items`,
        body: paymentData.items.map(item => `${item.name} x${item.quantity}`).join(', '),
        payer_email: paymentData.customerEmail,
        return_url: `${window.location.origin}/payment/khipu/return`,
        cancel_url: `${window.location.origin}/payment/cancel`,
        notify_url: `${window.location.origin}/api/khipu/notify`,
      }),
    });

    const { payment_url } = await response.json();
    
    // Redirect to Khipu
    window.location.href = payment_url;

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Payment failed',
    };
  }
};

// Payment method selector
export const getAvailablePaymentMethods = () => [
  {
    id: 'stripe',
    name: 'Tarjeta de Crédito/Débito',
    description: 'Visa, Mastercard, American Express',
    icon: '💳',
    processor: processStripePayment,
  },
  {
    id: 'webpay',
    name: 'WebPay Plus',
    description: 'Transbank - Todas las tarjetas chilenas',
    icon: '🏦',
    processor: processWebPayPayment,
  },
  {
    id: 'mercadopago',
    name: 'MercadoPago',
    description: 'Transferencia bancaria y más',
    icon: '💰',
    processor: processMercadoPagoPayment,
  },
  {
    id: 'khipu',
    name: 'Khipu',
    description: 'Transferencia bancaria instantánea',
    icon: '🏧',
    processor: processKhipuPayment,
  },
];