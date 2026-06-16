"use client"
import React from "react";

export default function SubmitButton({ disabled, loading, onClick }: { disabled?: boolean; loading?: boolean; onClick?: () => void }) {
  return (
    <button
      className={`w-full py-3 rounded-xl text-white ${disabled ? "bg-slate-300" : "bg-emerald-600"}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? "Envoi en cours..." : "Envoyer le signalement"}
    </button>
  );
}
