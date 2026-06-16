"use client";

import { useMemo } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import NotificationCard from "@/components/Notifications/NotificationCard";
import { Button } from "@/components/ui/button";

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
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
        <div className="space-y-4">
          <div className="h-8 w-44 rounded-full bg-slate-200 animate-pulse" />
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-24 rounded-3xl bg-slate-200 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6 text-center text-red-600">
        Impossible de charger les notifications.
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
        <div className="mx-auto max-w-lg rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 text-3xl text-slate-400">
            🔔
          </div>
          <h1 className="text-xl font-semibold text-slate-900">Aucune notification</h1>
          <p className="mt-2 text-sm text-slate-500">Vous êtes à jour, aucune nouvelle notification pour le moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Notifications</h1>
            <p className="mt-1 text-sm text-slate-500">Dernières activités et alertes.</p>
          </div>
          <Button variant="outline" className="h-11" onClick={() => markAllAsRead.mutateAsync()}>
            Tout marquer comme lu
          </Button>
        </div>

        {unread.length > 0 && (
          <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Non lues</h2>
                <p className="text-sm text-slate-500">{unread.length} notification{unread.length > 1 ? "s" : ""} non lue{unread.length > 1 ? "s" : ""}</p>
              </div>
            </div>
            <div className="space-y-3">
              {unread.map((notification) => (
                <NotificationCard key={notification.id} notification={notification} onClick={() => handleItemClick(notification)} />
              ))}
            </div>
          </section>
        )}

        {read.length > 0 && (
          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Lues</h2>
            </div>
            <div className="space-y-3">
              {read.map((notification) => (
                <NotificationCard key={notification.id} notification={notification} onClick={() => handleItemClick(notification)} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
