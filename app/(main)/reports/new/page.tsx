"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { usePhotoUpload } from "@/hooks/usePhotoUpload";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import PhotoUpload from "@/components/ReportForm/PhotoUpload";
import LocationPicker from "@/components/ReportForm/LocationPicker";
import DescriptionInput from "@/components/ReportForm/DescriptionInput";
import SubmitButton from "@/components/ReportForm/SubmitButton";
import { createReport } from "@/lib/api/reports";
import { reportSchema } from "@/lib/utils/validation";

export default function NewReportPage() {
  const router = useRouter();
  const photo = usePhotoUpload();
  const loc = useCurrentLocation();
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit() {
    if (!photo.photoFile || !loc.lat || !description) return;
    const parsed = reportSchema.safeParse({ description, lat: loc.lat, lng: loc.lng });
    if (!parsed.success) {
      alert("Formulaire invalide — vérifie la description et la localisation.");
      return;
    }
    setSubmitting(true);
    try {
      await createReport(photo.photoFile, loc.lat!, loc.lng!, description);
      setSuccess(true);
      setTimeout(() => router.push("/reports"), 1200);
    } catch (e) {
      console.error(e);
      alert("Erreur lors de l'envoi. Réessaie plus tard.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6">
      <div className="flex items-center gap-4">
        <button className="text-lg" onClick={() => history.back()} aria-label="Retour">←</button>
        <h1 className="text-xl font-bold">Nouveau signalement</h1>
      </div>

      <div className="mt-6 space-y-6 pb-32">
        <section>
          <h2 className="font-semibold mb-2">Étape 1 — Prendre une photo</h2>
          <PhotoUpload
            photoPreview={photo.photoPreview}
            isLoading={photo.isLoading}
            error={photo.error}
            onFile={photo.handleFile}
            onReset={photo.reset}
          />
        </section>

        <section>
          <h2 className="font-semibold mb-2">Étape 2 — Localisation</h2>
          <LocationPicker
            lat={loc.lat}
            lng={loc.lng}
            address={loc.address}
            loading={loc.loading}
            onChange={(lat, lng) => loc.setPosition?.(lat, lng)}
          />
        </section>

        <section>
          <h2 className="font-semibold mb-2">Étape 3 — Description</h2>
          <DescriptionInput value={description} onChange={setDescription} />
        </section>
      </div>

      <div className="fixed left-4 right-4 bottom-4">
        <SubmitButton
          disabled={!photo.photoFile || !loc.lat || !description}
          loading={submitting}
          onClick={handleSubmit}
        />
      </div>

      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center">
            <div className="text-4xl text-emerald-600">✓</div>
            <div className="mt-2 font-semibold">Signalement envoyé</div>
          </div>
        </div>
      )}
    </div>
  );
}
