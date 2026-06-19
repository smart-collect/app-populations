"use client";

import { useMemo } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import NotificationCard from "@/components/Notifications/NotificationCard";
import { Button } from "@/components/ui/button";
import { BinoMascot } from "@/components/BinoMascot";

export default function NotificationsPage() {
  const { notifications, isLoading, isError, markAsRead, markAllAsRead } = useNotifications();

  const unread = useMemo(() => notifications.filter((item) => !item.read), [notifications]);
  const read = useMemo(() => notifications.filter((item) => item.read), [notifications]);

  const handleItemClick = async (notification: typeof notifications[number]) => {
    if (!notification.read) {
      await markAsRead.mutateAsync(notification.id);
    }

    if (notification.relatedId) {
      window.location.href = `/reports/${notification.relatedId}`;
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col h-full bg-slate-50/50 animate-pulse">
        <div className="bg-primary px-5 pt-5 pb-4 flex items-center justify-between flex-shrink-0 shadow-md text-white">
          <h2 className="text-lg font-bold tracking-wide">Notifications</h2>
          <div className="h-6 w-24 bg-white/20 rounded-lg" />
        </div>
        <div className="flex-1 p-5 space-y-4">
          <div className="h-6 w-32 bg-slate-200 rounded-full" />
          <div className="h-20 bg-slate-200 rounded-2xl" />
          <div className="h-20 bg-slate-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col h-full bg-slate-50/50">
        <div className="bg-primary px-5 pt-5 pb-4 flex items-center justify-between flex-shrink-0 shadow-md text-white">
          <h2 className="text-lg font-bold tracking-wide">Notifications</h2>
          <div className="w-8" />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <BinoMascot pose="surprised" size={80} className="drop-shadow-sm mb-3" />
          <p className="text-sm font-semibold text-danger">Impossible de charger les notifications.</p>
          <Button variant="outline" size="sm" className="mt-4" onClick={() => window.location.reload()}>
            Réessayer
          </Button>
        </div>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col h-full bg-slate-50/50">
        <div className="bg-primary px-5 pt-5 pb-4 flex items-center justify-between flex-shrink-0 shadow-md text-white">
          <h2 className="text-lg font-bold tracking-wide">Notifications</h2>
          <div className="w-8" />
        </div>
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="w-full max-w-sm rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm flex flex-col items-center">
            <BinoMascot pose="surprised" size={80} className="drop-shadow-sm mb-4" />
            <h3 className="text-base font-bold text-slate-800">Aucune notification</h3>
            <p className="mt-1 text-xs text-slate-500 max-w-[240px] leading-relaxed">
              Vous êtes à jour ! Aucune nouvelle notification pour le moment.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-50/50">
      {/* Green Topbar - based on mockup 11 */}
      <div className="bg-primary px-5 pt-5 pb-4 flex items-center justify-between flex-shrink-0 shadow-md text-white">
        <h2 className="text-lg font-bold tracking-wide">Notifications</h2>
        {unread.length > 0 && (
          <button
            onClick={() => markAllAsRead.mutateAsync()}
            className="text-xs font-bold text-white/90 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg active:scale-95 transition-all"
          >
            Tout marquer lu
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
        {unread.length > 0 && (
          <section className="space-y-2.5">
            <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
              Aujourd&apos;hui (Non lues)
            </h2>
            <div className="space-y-2">
              {unread.map((notification) => (
                <div key={notification.id} className="border-l-4 border-primary rounded-r-xl overflow-hidden shadow-sm">
                  <NotificationCard
                    notification={notification}
                    onClick={() => handleItemClick(notification)}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {read.length > 0 && (
          <section className="space-y-2.5">
            <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
              Déjà lues
            </h2>
            <div className="space-y-2 opacity-80">
              {read.map((notification) => (
                <div key={notification.id} className="shadow-sm rounded-xl overflow-hidden">
                  <NotificationCard
                    notification={notification}
                    onClick={() => handleItemClick(notification)}
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
