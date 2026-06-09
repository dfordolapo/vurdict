import axios from 'axios';

const PAYSTACK_API = 'https://api.paystack.co';

export async function verifyTransaction(reference) {
  if (!reference) {
    throw new Error('Transaction reference is required');
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    throw new Error('Paystack secret key is not configured');
  }

  try {
    const response = await axios.get(`${PAYSTACK_API}/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 15000,
    });

    const { data } = response.data;

    return {
      verified: data.status === 'success',
      status: data.status,
      amount: data.amount,
      currency: data.currency,
      reference: data.reference,
      paidAt: data.paid_at,
      customerEmail: data.customer?.email,
    };
  } catch (err) {
    if (err.response?.status === 404) {
      return { verified: false, status: 'not_found' };
    }
    throw new Error('Failed to verify payment with Paystack');
  }
}
