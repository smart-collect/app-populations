"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    logout();
    router.replace("/");
  };

  return (
    <>
      <Button variant="destructive" className="w-full" onClick={() => setOpen(true)}>
        Se déconnecter
      </Button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold">Se déconnecter ?</h2>
            <p className="mt-2 text-sm text-slate-600">Êtes-vous sûr de vouloir vous déconnecter ?</p>
            <div className="mt-6 flex flex-col gap-3">
              <Button variant="destructive" onClick={handleConfirm}>
                Confirmer
              </Button>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Annuler
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
