export const WHATSAPP_LINK = "https://wa.me/";
export const FORM_SUBMIT_DELAY_MS = 900;

export function getTodayDateISO() {
  return new Date().toISOString().split("T")[0];
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
