import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder");

const C = {
  teal: "#1B6E8A", tealDark: "#134E63", tealDeep: "#0C2F3D",
  green: "#00D455", white: "#FFFFFF", offWhite: "#F4F8F9",
  lightTeal: "rgba(27,110,138,0.06)", gray: "#5A6B73",
  grayLight: "#8A9BA3", dark: "#091E27",
};
const F = { h: "'Playfair Display',Georgia,serif", b: "'DM Sans','Helvetica Neue',sans-serif" };

function fmt(cents, currency = "usd") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(cents / 100);
}

function Spinner() {
  return (
    <div style={{ textAlign: "center", padding: "40px 0" }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{
        width: 32, height: 32,
        border: `3px solid ${C.lightTeal}`,
        borderTop: `3px solid ${C.teal}`,
        borderRadius: "50%",
        animation: "spin .8s linear infinite",
        margin: "0 auto 14px",
      }} />
      <p style={{ fontFamily: F.b, fontSize: 14, color: C.grayLight, margin: 0 }}>One moment…</p>
    </div>
  );
}

// ── Step 1: Email lookup ──────────────────────────────────────────────────────
function EmailStep({ onFound }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const lookup = async () => {
    if (!email.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/lookup-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      onFound(data.invoices || [], email.trim());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inp = {
    fontFamily: F.b, fontSize: 17, padding: "15px 18px",
    border: `1px solid rgba(27,110,138,.15)`, borderRadius: 2,
    background: C.white, color: C.tealDeep, width: "100%",
    boxSizing: "border-box", outline: "none", transition: "border-color .2s",
  };

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%",
          background: `${C.green}14`,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 16px",
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        </div>
        <h3 style={{ fontFamily: F.h, fontSize: 22, fontWeight: 700, color: C.tealDeep, margin: "0 0 6px" }}>Find Your Invoices</h3>
        <p style={{ fontFamily: F.b, fontSize: 14, color: C.grayLight, margin: 0, lineHeight: 1.5 }}>
          Enter the email address on file with QC Atlantic.
        </p>
      </div>

      <div style={{ marginBottom: 14 }}>
        <label style={{
          fontFamily: F.b, fontSize: 11.5, fontWeight: 600,
          letterSpacing: ".08em", textTransform: "uppercase",
          color: C.teal, marginBottom: 7, display: "block",
        }}>Email Address</label>
        <input
          style={inp}
          type="email"
          value={email}
          placeholder="you@company.com"
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === "Enter" && lookup()}
          onFocus={e => e.target.style.borderColor = C.teal}
          onBlur={e => e.target.style.borderColor = "rgba(27,110,138,.15)"}
          autoFocus
        />
      </div>

      {error && (
        <div style={{
          fontFamily: F.b, fontSize: 13.5, color: "#c0392b",
          background: "#fff5f5", padding: "11px 15px",
          border: "1px solid #fcc", borderRadius: 3, marginBottom: 14,
        }}>{error}</div>
      )}

      {loading ? <Spinner /> : (
        <button
          onClick={lookup}
          disabled={!email.trim()}
          style={{
            fontFamily: F.b, fontSize: 14.5, fontWeight: 600,
            padding: "15px 0", width: "100%",
            background: email.trim() ? C.green : C.grayLight,
            color: C.dark, border: "none", borderRadius: 2,
            cursor: email.trim() ? "pointer" : "not-allowed",
            letterSpacing: ".04em", textTransform: "uppercase",
            transition: "background .2s",
          }}
        >
          Look Up My Invoices
        </button>
      )}
    </div>
  );
}

// ── Step 2: Invoice list ──────────────────────────────────────────────────────
function InvoiceListStep({ invoices, email, onSelect, onBack }) {
  if (invoices.length === 0) {
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%",
          background: `${C.green}14`,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 18px",
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h3 style={{ fontFamily: F.h, fontSize: 22, fontWeight: 700, color: C.tealDeep, margin: "0 0 8px" }}>All Paid Up!</h3>
        <p style={{ fontFamily: F.b, fontSize: 14.5, color: C.gray, margin: "0 0 28px", lineHeight: 1.6 }}>
          No open invoices found for <strong>{email}</strong>.<br/>
          All your invoices are paid.
        </p>
        <button onClick={onBack} style={{
          fontFamily: F.b, fontSize: 13.5, fontWeight: 500, padding: "11px 24px",
          background: "transparent", color: C.teal,
          border: `1px solid rgba(27,110,138,.2)`, borderRadius: 2, cursor: "pointer",
        }}>
          ← Try a different email
        </button>
      </div>
    );
  }

  const total = invoices.reduce((s, inv) => s + inv.amountDue, 0);
  const currency = invoices[0].currency;

  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
          <h3 style={{ fontFamily: F.h, fontSize: 21, fontWeight: 700, color: C.tealDeep, margin: 0 }}>
            Open Invoices
          </h3>
          <span style={{ fontFamily: F.b, fontSize: 13, color: C.grayLight }}>
            {invoices.length} invoice{invoices.length > 1 ? "s" : ""}
          </span>
        </div>
        <p style={{ fontFamily: F.b, fontSize: 13, color: C.grayLight, margin: 0 }}>{email}</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        {invoices.map((inv, i) => (
          <button
            key={inv.invoiceId}
            onClick={() => onSelect(inv)}
            style={{
              display: "block", width: "100%", textAlign: "left",
              background: C.white, border: `1px solid rgba(27,110,138,.1)`,
              borderRadius: 3, padding: "18px 20px", cursor: "pointer",
              transition: "border-color .2s, box-shadow .2s",
              position: "relative", overflow: "hidden",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.green; e.currentTarget.style.boxShadow = `0 2px 12px ${C.green}18`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(27,110,138,.1)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            {/* Green top bar */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${C.teal},${C.green})` }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontFamily: F.b, fontSize: 11, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: C.grayLight, marginBottom: 4 }}>
                  Invoice #{inv.number}
                </div>
                <div style={{ fontFamily: F.b, fontSize: 14.5, color: C.tealDeep, fontWeight: 500, marginBottom: 3 }}>
                  {inv.description}
                </div>
                {inv.dueDate && (
                  <div style={{ fontFamily: F.b, fontSize: 12, color: C.grayLight }}>
                    Due {inv.dueDate}
                  </div>
                )}
              </div>
              <div style={{ textAlign: "right", flexShrink: 0, paddingLeft: 16 }}>
                <div style={{ fontFamily: F.h, fontSize: 22, fontWeight: 700, color: C.tealDeep }}>
                  {fmt(inv.amountDue, inv.currency)}
                </div>
                <div style={{
                  fontFamily: F.b, fontSize: 11, fontWeight: 600,
                  color: C.green, letterSpacing: ".08em", textTransform: "uppercase", marginTop: 4,
                }}>
                  Pay Now →
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {invoices.length > 1 && (
        <div style={{
          background: C.offWhite, border: `1px solid rgba(27,110,138,.08)`,
          borderRadius: 3, padding: "13px 18px", marginBottom: 18,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ fontFamily: F.b, fontSize: 13, color: C.gray }}>Total outstanding</span>
          <span style={{ fontFamily: F.h, fontSize: 20, fontWeight: 700, color: C.tealDeep }}>
            {fmt(total, currency)}
          </span>
        </div>
      )}

      <button onClick={onBack} style={{
        fontFamily: F.b, fontSize: 13, fontWeight: 500, padding: "10px 0",
        background: "transparent", color: C.grayLight, border: "none",
        cursor: "pointer", textDecoration: "underline", width: "100%", textAlign: "center",
      }}>
        ← Try a different email
      </button>
    </div>
  );
}

// ── Step 3: Card payment form ─────────────────────────────────────────────────
function CardForm({ invoice, onSuccess, onBack }) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [loadingIntent, setLoadingIntent] = useState(true);

  useEffect(() => {
    async function createIntent() {
      try {
        const res = await fetch("/api/pay-invoice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ invoiceId: invoice.invoiceId }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setClientSecret(data.clientSecret);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingIntent(false);
      }
    }
    createIntent();
  }, [invoice.invoiceId]);

  const handleSubmit = async () => {
    if (!stripe || !elements || !clientSecret) return;
    setProcessing(true);
    setError(null);
    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) },
    });
    if (stripeError) {
      setError(stripeError.message);
      setProcessing(false);
    } else if (paymentIntent.status === "succeeded") {
      onSuccess(paymentIntent);
    }
  };

  if (loadingIntent) return <Spinner />;

  return (
    <div>
      {/* Invoice summary */}
      <div style={{
        background: C.offWhite, border: `1px solid rgba(27,110,138,.08)`,
        borderRadius: 3, padding: 20, marginBottom: 24, position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${C.teal},${C.green})` }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
          <div>
            <div style={{ fontFamily: F.b, fontSize: 11, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: C.grayLight, marginBottom: 3 }}>
              Invoice #{invoice.number}
            </div>
            {invoice.customerName && (
              <div style={{ fontFamily: F.b, fontSize: 14.5, color: C.tealDeep, fontWeight: 500 }}>
                {invoice.customerName}
              </div>
            )}
          </div>
          <div style={{ fontFamily: F.h, fontSize: 26, fontWeight: 700, color: C.tealDeep }}>
            {fmt(invoice.amountDue, invoice.currency)}
          </div>
        </div>
        {invoice.lineItems?.length > 0 && (
          <div style={{ borderTop: `1px solid rgba(27,110,138,.08)`, paddingTop: 10 }}>
            {invoice.lineItems.map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", fontFamily: F.b, fontSize: 13, color: C.gray, marginBottom: 4 }}>
                <span>{item.description}</span>
                <span style={{ fontWeight: 500 }}>{fmt(item.amount, invoice.currency)}</span>
              </div>
            ))}
          </div>
        )}
        {invoice.dueDate && (
          <div style={{ fontFamily: F.b, fontSize: 12, color: C.grayLight, marginTop: 6 }}>
            Due {invoice.dueDate}
          </div>
        )}
      </div>

      {/* Card */}
      <div style={{ marginBottom: 18 }}>
        <label style={{
          fontFamily: F.b, fontSize: 11.5, fontWeight: 600,
          letterSpacing: ".08em", textTransform: "uppercase",
          color: C.teal, marginBottom: 8, display: "block",
        }}>Card Details</label>
        <div style={{
          padding: "14px 16px", border: `1px solid rgba(27,110,138,.15)`,
          borderRadius: 2, background: C.white,
        }}>
          <CardElement options={{ style: { base: { fontSize: "16px", fontFamily: F.b, color: C.tealDeep, "::placeholder": { color: C.grayLight } }, invalid: { color: "#c0392b" } } }} />
        </div>
      </div>

      {error && (
        <div style={{
          fontFamily: F.b, fontSize: 13.5, color: "#c0392b",
          background: "#fff5f5", padding: "11px 15px",
          border: "1px solid #fcc", borderRadius: 3, marginBottom: 16,
        }}>{error}</div>
      )}

      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={onBack}
          style={{
            fontFamily: F.b, fontSize: 14, fontWeight: 500, padding: "14px 20px",
            background: "transparent", color: C.gray,
            border: `1px solid rgba(27,110,138,.15)`, borderRadius: 2, cursor: "pointer",
          }}
        >← Back</button>
        <button
          onClick={handleSubmit}
          disabled={!stripe || processing}
          style={{
            fontFamily: F.b, fontSize: 15, fontWeight: 600, padding: "14px 0",
            background: processing ? C.grayLight : C.green,
            color: C.dark, border: "none", borderRadius: 2, flex: 1,
            cursor: processing ? "not-allowed" : "pointer",
            letterSpacing: ".04em", textTransform: "uppercase",
            transition: "background .2s",
          }}
        >
          {processing ? "Processing…" : `Pay ${fmt(invoice.amountDue, invoice.currency)}`}
        </button>
      </div>

      <div style={{ fontFamily: F.b, fontSize: 11, color: C.grayLight, textAlign: "center", marginTop: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={C.grayLight} strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
        Secured by Stripe. QC Atlantic never sees your card details.
      </div>
    </div>
  );
}

// ── Step 4: Success ───────────────────────────────────────────────────────────
function SuccessStep({ invoice, onReset }) {
  return (
    <div style={{ textAlign: "center", padding: "10px 0" }}>
      <div style={{
        width: 64, height: 64, borderRadius: "50%",
        background: `${C.green}15`,
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 20px",
      }}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <h3 style={{ fontFamily: F.h, fontSize: 26, fontWeight: 700, color: C.tealDeep, margin: "0 0 8px" }}>
        Payment Received
      </h3>
      <p style={{ fontFamily: F.b, fontSize: 15, color: C.gray, margin: "0 0 4px" }}>
        Invoice #{invoice?.number} — {fmt(invoice?.amountDue, invoice?.currency)}
      </p>
      <p style={{ fontFamily: F.b, fontSize: 13, color: C.grayLight, margin: "0 0 32px" }}>
        A receipt has been sent to {invoice?.customerEmail}.
      </p>
      <button
        onClick={onReset}
        style={{
          fontFamily: F.b, fontSize: 13.5, fontWeight: 500, padding: "12px 28px",
          background: "transparent", color: C.teal,
          border: `1px solid rgba(27,110,138,.2)`, borderRadius: 2, cursor: "pointer",
        }}
      >
        Pay Another Invoice
      </button>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function PaymentPage() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState("email"); // email → list → pay → success
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [lookupEmail, setLookupEmail] = useState("");

  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const handleFound = (foundInvoices, email) => {
    setInvoices(foundInvoices);
    setLookupEmail(email);
    setStep("list");
  };

  const handleSelect = (inv) => {
    setSelectedInvoice(inv);
    setStep("pay");
  };

  const handleReset = () => {
    setStep("email");
    setInvoices([]);
    setSelectedInvoice(null);
    setLookupEmail("");
  };

  const stepTitles = {
    email: { label: "Payment Portal", title: "Pay Your Invoice", sub: "Enter your email address to view and pay any open invoices from QC Atlantic." },
    list: { label: "Open Invoices", title: "Select an Invoice", sub: `Showing open invoices for ${lookupEmail}.` },
    pay: { label: "Secure Checkout", title: "Complete Payment", sub: "Your payment is encrypted and processed securely by Stripe." },
    success: { label: "Payment Portal", title: "Thank You", sub: "Your payment has been processed." },
  };

  const current = stepTitles[step] || stepTitles.email;

  return (
    <div>
      {/* Header */}
      <section style={{ background: `linear-gradient(160deg,${C.dark} 0%,${C.tealDeep} 100%)`, padding: "160px 32px 80px", textAlign: "center" }}>
        <div style={{
          maxWidth: 700, margin: "0 auto",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all .6s ease",
        }}>
          <div style={{ fontFamily: F.b, fontSize: 11.5, letterSpacing: ".2em", textTransform: "uppercase", color: C.green, marginBottom: 14, fontWeight: 600 }}>
            {current.label}
          </div>
          <h1 style={{ fontFamily: F.h, fontSize: "clamp(32px,5vw,52px)", color: C.white, margin: "0 0 14px", fontWeight: 700 }}>
            {current.title}
          </h1>
          <p style={{ fontFamily: F.b, fontSize: 16, color: "rgba(255,255,255,.5)", margin: 0, lineHeight: 1.6 }}>
            {current.sub}
          </p>
        </div>
      </section>

      {/* Card area */}
      <section style={{ background: C.offWhite }}>
        <div style={{ maxWidth: 520, margin: "0 auto", padding: "80px 24px" }}>
          <div style={{
            background: C.white, padding: 40,
            border: `1px solid rgba(27,110,138,.08)`,
            borderRadius: 3, boxShadow: "0 4px 24px rgba(27,110,138,.04)",
          }}>
            {step === "email" && <EmailStep onFound={handleFound} />}
            {step === "list" && (
              <InvoiceListStep
                invoices={invoices}
                email={lookupEmail}
                onSelect={handleSelect}
                onBack={handleReset}
              />
            )}
            {step === "pay" && selectedInvoice && (
              <Elements stripe={stripePromise}>
                <CardForm
                  invoice={selectedInvoice}
                  onBack={() => setStep("list")}
                  onSuccess={() => setStep("success")}
                />
              </Elements>
            )}
            {step === "success" && (
              <SuccessStep invoice={selectedInvoice} onReset={handleReset} />
            )}
          </div>

          {/* Help text */}
          <div style={{ textAlign: "center", marginTop: 28, fontFamily: F.b, fontSize: 13, color: C.grayLight, lineHeight: 1.7 }}>
            Questions about your invoice? Contact Winston at{" "}
            <a href="tel:3369098321" style={{ color: C.teal, textDecoration: "none" }}>(336) 909-8321</a>
            {" "}or{" "}
            <a href="mailto:wmatney@qcatlantic.com" style={{ color: C.teal, textDecoration: "none" }}>wmatney@qcatlantic.com</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export { C as COLORS, F as FONTS };
