type TrackingPayload = Record<string, string | number | boolean | undefined>;

export function trackEvent(event: string, payload?: TrackingPayload) {
  if (typeof window === "undefined") {
    return;
  }

  const dataLayer = (window as Window & { dataLayer?: unknown[] }).dataLayer ?? [];

  dataLayer.push({
    event,
    ...payload,
    timestamp: new Date().toISOString(),
  });

  (window as Window & { dataLayer?: unknown[] }).dataLayer = dataLayer;
}

export function trackCta(label: string) {
  trackEvent("cta_clicked", { label });
}

export function trackLeadStart() {
  trackEvent("lead_form_started");
}

export function trackLeadSubmitted() {
  trackEvent("lead_form_submitted");
}

export function trackWhatsappClick() {
  trackEvent("whatsapp_clicked");
}
