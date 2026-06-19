"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { usePhotoUpload } from "@/hooks/usePhotoUpload";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { createReport } from "@/lib/api/reports";
import { reportSchema } from "@/lib/utils/validation";
import { BinoMascot } from "@/components/BinoMascot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, X, Check, Camera, Image } from "lucide-react";

const MapPicker = dynamic(() => import("@/components/ReportForm/MapPicker"), {
  ssr: false,
});

export default function NewReportPage() {
  const router = useRouter();
  const photo = usePhotoUpload();
  const loc = useCurrentLocation();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [description, setDescription] = useState("");
  const [reportType, setReportType] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const galleryInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Prepopulate location / description if query parameters are present (from Map page)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const descParam = params.get("desc");
      if (descParam) {
        setDescription(descParam);
        // Deduce report type
        if (descParam.toLowerCase().includes("plein")) {
          setReportType("🗑️ Bac plein");
        }
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      photo.handleFile(file);
    }
  };

  const handleSelectType = (type: string) => {
    setReportType(type);
    // Auto-update description placeholder or value if empty
    if (!description || description.startsWith("Bac plein") || description.startsWith("Dépôt sauvage") || description.startsWith("Bac endommagé") || description.startsWith("Feu")) {
      setDescription(`${type.substring(3)} : `);
    }
  };

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
      setTimeout(() => router.push("/reports"), 1500);
    } catch (e) {
      console.error(e);
      alert("Erreur lors de l'envoi. Réessaie plus tard.");
    } finally {
      setSubmitting(false);
    }
  }

  const isNextDisabled = () => {
    if (step === 1) return !photo.photoFile || photo.isLoading;
    if (step === 2) return !loc.lat || loc.loading;
    return !description.trim();
  };

  const nextStep = () => {
    if (step < 3) setStep((s) => (s + 1) as any);
  };

  const prevStep = () => {
    if (step > 1) setStep((s) => (s - 1) as any);
    else router.back();
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/50 min-h-screen">
      {/* Topbar - White style with back and steps */}
      <div className="bg-white border-b px-4 py-3.5 flex items-center justify-between flex-shrink-0 shadow-sm">
        <button
          onClick={prevStep}
          className="p-1 rounded-full text-slate-700 hover:bg-slate-100 hover:text-primary transition-all"
          aria-label="Retour"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-sm font-bold text-slate-800">Nouveau signalement</h2>
        <div className="w-8" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col justify-between pb-28">
        <div>
          {/* Progress Indicators - based on mockups */}
          <div className="space-y-3 mb-6">
            <div className="flex gap-2">
              <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 1 ? "bg-primary" : "bg-slate-200"}`} />
              <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 2 ? "bg-primary" : "bg-slate-200"}`} />
              <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 3 ? "bg-primary" : "bg-slate-200"}`} />
            </div>
            <p className="text-[10px] font-black text-primary uppercase tracking-widest">
              ÉTAPE {step} SUR 3
            </p>
          </div>

          {/* Wizard step 1: Photo */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="space-y-1">
                <h1 className="text-xl font-black text-slate-900 tracking-tight">Prenez une photo</h1>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Photographiez le bac ou le dépôt sauvage pour aider les agents Hysacam à intervenir rapidement.
                </p>
              </div>

              {/* Bino bubble tip */}
              <div className="bg-green-50/70 border border-green-100/50 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
                <BinoMascot pose="standing" size={48} className="drop-shadow-sm flex-shrink-0" />
                <p className="text-[11px] text-emerald-800 leading-normal font-semibold">
                  &ldquo;Prends une photo bien éclairée pour qu&apos;on puisse facilement repérer les ordures !&rdquo;
                </p>
              </div>

              {/* File Inputs (hidden) */}
              <input
                ref={galleryInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Dotted Photo placeholder card */}
              {!photo.photoPreview ? (
                <div
                  onClick={() => cameraInputRef.current?.click()}
                  className="w-full h-52 border-2 border-dashed border-primary-light/40 bg-emerald-50/20 hover:bg-emerald-50/40 rounded-2xl flex flex-col items-center justify-center text-primary-light transition-all cursor-pointer group"
                >
                  <Camera size={36} className="group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-xs font-bold mt-2">Ajouter une photo</span>
                </div>
              ) : (
                <div className="relative w-full h-52 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-black flex items-center justify-center">
                  <img
                    src={photo.photoPreview}
                    alt="Aperçu du signalement"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={photo.reset}
                    className="absolute top-2.5 right-2.5 bg-slate-900/60 hover:bg-slate-900/80 text-white p-1.5 rounded-full backdrop-blur-sm transition-all"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              {/* Compression loader or error */}
              {photo.isLoading && (
                <p className="text-xs text-slate-500 font-semibold text-center animate-pulse">
                  Traitement et compression de l&apos;image...
                </p>
              )}
              {photo.error && (
                <p className="text-xs text-danger font-bold text-center">
                  ⚠️ {photo.error}
                </p>
              )}

              {/* Camera & Gallery Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={() => galleryInputRef.current?.click()}
                  type="button"
                  variant="outline"
                  className="flex-1 h-12 bg-white rounded-xl border-slate-200 text-slate-700 font-bold hover:bg-slate-50 flex items-center justify-center gap-2"
                >
                  <Image size={16} /> Galerie
                </Button>
                <Button
                  onClick={() => cameraInputRef.current?.click()}
                  type="button"
                  variant="outline"
                  className="flex-1 h-12 bg-white rounded-xl border-slate-200 text-slate-700 font-bold hover:bg-slate-50 flex items-center justify-center gap-2"
                >
                  <Camera size={16} /> Caméra
                </Button>
              </div>
            </div>
          )}

          {/* Wizard step 2: Location */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="space-y-1">
                <h1 className="text-xl font-black text-slate-900 tracking-tight">Confirmez la position</h1>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Nous avons détecté votre position. Ajustez le repère sur la carte si besoin.
                </p>
              </div>

              {/* Map inline display - based on mockup 6b */}
              <div className="w-full h-52 rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative bg-slate-100">
                {loc.lat != null && loc.lng != null ? (
                  <MapPicker
                    lat={loc.lat}
                    lng={loc.lng}
                    onChange={(la, lo) => loc.setPosition?.(la, lo)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2 text-xs font-semibold p-4 text-center">
                    {loc.loading ? (
                      <>
                        <span className="w-2 h-2 bg-primary rounded-full animate-ping" />
                        <span>Récupération des coordonnées...</span>
                      </>
                    ) : (
                      <span>Coordonnées non disponibles. Veuillez activer le GPS.</span>
                    )}
                  </div>
                )}
              </div>

              {/* Address Field */}
              <div className="space-y-1.5">
                <Label htmlFor="address-field" className="text-xs font-semibold text-slate-500">
                  Adresse / quartier
                </Label>
                <Input
                  id="address-field"
                  value={loc.address || ""}
                  readOnly
                  placeholder="Recherche de l'adresse..."
                  className="h-12 rounded-xl bg-white border-slate-200 font-medium text-xs text-slate-700 text-ellipsis truncate"
                />
              </div>

              {/* Geolocalisation Trigger */}
              <Button
                onClick={() => {
                  window.location.reload();
                }}
                type="button"
                variant="outline"
                className="w-full h-11 border-primary text-primary hover:bg-primary/5 rounded-xl font-bold text-xs bg-white"
              >
                📍 Utiliser ma position actuelle
              </Button>
            </div>
          )}

          {/* Wizard step 3: Description */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="space-y-1">
                <h1 className="text-xl font-black text-slate-900 tracking-tight">Décrivez le problème</h1>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Sélectionnez un type et ajoutez des détails pour orienter les agents de nettoyage.
                </p>
              </div>

              {/* Bino bubble tip */}
              <div className="bg-emerald-50/70 border border-emerald-100/50 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
                <BinoMascot pose="holding" size={48} className="drop-shadow-sm flex-shrink-0" />
                <p className="text-[11px] text-emerald-800 leading-normal font-semibold">
                  &ldquo;N&apos;hésite pas à me dire depuis combien de jours le bac déborde !&rdquo;
                </p>
              </div>

              {/* Badges types */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-slate-500">Type de signalement</Label>
                <div className="flex flex-wrap gap-2">
                  {["🗑️ Bac plein", "🚧 Dépôt sauvage", "⚠️ Bac endommagé", "🔥 Feu / fumée"].map((type) => {
                    const isSelected = reportType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleSelectType(type)}
                        className={`text-xs font-extrabold px-3.5 py-2 rounded-xl border transition-all ${
                          isSelected
                            ? "bg-primary text-white border-primary shadow-sm"
                            : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Textarea Description */}
              <div className="space-y-1.5">
                <Label htmlFor="desc-field" className="text-xs font-semibold text-slate-500">
                  Description (optionnel)
                </Label>
                <textarea
                  id="desc-field"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ex. Le bac débordait depuis 3 jours, des ordures sont au sol..."
                  className="w-full h-24 rounded-xl border border-slate-200 p-3 text-xs font-medium text-slate-700 bg-white focus:outline-none focus:border-primary-light resize-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Navigation Actions buttons at the bottom */}
        <div className="fixed left-4 right-4 bottom-4 z-40 max-w-[448px] mx-auto">
          {step < 3 ? (
            <Button
              onClick={nextStep}
              disabled={isNextDisabled()}
              className="w-full h-12 font-bold rounded-xl shadow-lg bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isNextDisabled() ? 'Veuillez remplir ce champ' : 'Suivant'}
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isNextDisabled() || submitting}
              className="w-full h-12 font-bold rounded-xl shadow-lg bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Envoi du signalement..." : "Envoyer le signalement"}
            </Button>
          )}
        </div>
      </div>

      {/* Success Popup Screen - premium overlay */}
      {success && (
        <div className="fixed inset-0 z-max flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-6">
          <div className="bg-white rounded-2xl p-6 shadow-2xl flex flex-col items-center text-center max-w-xs w-full border border-slate-100 ring-4 ring-black/5 animate-in scale-in duration-300">
            {/* Animated Success ring */}
            <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4 shadow-inner">
              <Check size={28} className="stroke-[3]" />
            </div>

            <BinoMascot pose="waving" size={80} className="drop-shadow-md mb-3" />

            <h3 className="font-extrabold text-slate-800 text-base">Signalement envoyé !</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-[200px] leading-relaxed">
              Merci pour votre contribution à un Douala plus propre.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
