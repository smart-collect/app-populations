"use client"
import React from "react";

export default function DescriptionInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <textarea
        maxLength={500}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Décris brièvement ce que tu signales..."
        className="w-full min-h-[120px] p-3 border rounded-md"
      />
      <div className="text-sm text-slate-500 mt-2">{500 - value.length} caractères restants</div>
    </div>
  );
}
