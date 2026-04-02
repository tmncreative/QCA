import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { email } = JSON.parse(event.body);

    if (!email || email.trim() === '') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Email address is required.' }),
      };
    }

    const cleanedEmail = email.trim().toLowerCase();

    // Find the Stripe customer by email
    const customers = await stripe.customers.list({ email: cleanedEmail, limit: 5 });

    if (!customers.data || customers.data.length === 0) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'No account found for that email. Check the address or contact Winston directly.' }),
      };
    }

    // Gather open invoices across all matching customers
    const openInvoices = [];

    for (const customer of customers.data) {
      const invoices = await stripe.invoices.list({
        customer: customer.id,
        status: 'open',
        limit: 50,
      });

      for (const invoice of invoices.data) {
        openInvoices.push({
          invoiceId: invoice.id,
          number: invoice.number,
          amountDue: invoice.amount_due,
          currency: invoice.currency,
          description: invoice.description || invoice.lines?.data?.[0]?.description || 'QC Atlantic Invoice',
          customerName: invoice.customer_name || customer.name || '',
          customerEmail: invoice.customer_email || cleanedEmail,
          dueDate: invoice.due_date
            ? new Date(invoice.due_date * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            : null,
          created: new Date(invoice.created * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          lineItems: invoice.lines?.data?.map((line) => ({
            description: line.description,
            amount: line.amount,
          })) || [],
          createdTs: invoice.created,
        });
      }
    }

    if (openInvoices.length === 0) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          invoices: [],
          message: 'No open invoices found. All invoices may already be paid.',
        }),
      };
    }

    // Sort newest first
    openInvoices.sort((a, b) => b.createdTs - a.createdTs);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ invoices: openInvoices }),
    };

  } catch (err) {
    console.error('Invoice lookup error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Something went wrong. Please try again or contact Winston directly.' }),
    };
  }
};
