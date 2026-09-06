/**
 * WhatsApp integration
 * ---------------------------------------------------------------------------
 * This site sends contact-form submissions via WhatsApp's public
 * "click-to-chat" link (`wa.me`). It requires no backend, no API key, and no
 * cost: the visitor's browser opens WhatsApp (app or web) in a new tab with
 * their message pre-filled, and they hit send themselves.
 *
 * This is the correct approach for a static portfolio site. WhatsApp does
 * not allow a webpage to silently deliver a message on a visitor's behalf —
 * that requires the paid WhatsApp Business Platform (Cloud API) with a
 * verified sender, a backend endpoint, and the visitor's opt-in. If you
 * later set that up, replace `buildWhatsAppLink` below with a `fetch()` call
 * to your own serverless function that forwards to the Business API.
 */

export interface ContactFormPayload {
  name: string;
  email: string;
  message: string;
}

/** E.164 phone number (digits only, no leading '+') that receives messages. */
const WHATSAPP_NUMBER = '919100710460';

export function buildWhatsAppLink(payload: ContactFormPayload): string {
  const text = [
    `New portfolio inquiry from ${payload.name}`,
    `Email: ${payload.email}`,
    '',
    payload.message,
  ].join('\n');

  const params = new URLSearchParams({ text });
  return `https://wa.me/${WHATSAPP_NUMBER}?${params.toString()}`;
}

export function buildDirectWhatsAppLink(prefilledText = "Hi Sai, I'd like to connect regarding an opportunity."): string {
  const params = new URLSearchParams({ text: prefilledText });
  return `https://wa.me/${WHATSAPP_NUMBER}?${params.toString()}`;
}
