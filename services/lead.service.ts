import type { LeadPayload } from "@/types/lead";

export async function submitLead(payload: LeadPayload) {
  const endpoint = process.env.NEXT_PUBLIC_LEAD_API_URL ?? "http://localhost:8080/api/leads";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Falha ao enviar lead");
  }

  return {
    ok: true,
    message: "Recebemos sua solicitação!",
    payload,
  };
}
