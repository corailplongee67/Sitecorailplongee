"use client";

import { Save } from "lucide-react";
import { useFormStatus } from "react-dom";

export function EventSubmitButton() {
  const { pending } = useFormStatus();
  return <button className="button button-navy" type="submit" disabled={pending}><Save size={16} /> {pending ? "Enregistrement…" : "Enregistrer"}</button>;
}
