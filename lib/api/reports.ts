export async function createReport(photo: File, lat: number, lng: number, description: string) {
  const fd = new FormData();
  fd.append("photo", photo);
  fd.append("lat", String(lat));
  fd.append("lng", String(lng));
  fd.append("description", description);

  const res = await fetch("/reports", {
    method: "POST",
    body: fd,
  });

  if (!res.ok) throw new Error("upload failed");
  return res.json();
}

export async function fetchMyReports({ status, page = 1, limit = 10 }: { status?: string; page?: number; limit?: number }) {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(limit));
  if (status) params.set("status", status);

  const res = await fetch(`/reports/mine?${params.toString()}`);
  if (!res.ok) {
    throw new Error("failed to fetch reports");
  }

  return res.json();
}

export async function fetchReportDetail(id: string) {
  const res = await fetch(`/reports/${id}`);
  if (!res.ok) {
    throw new Error("failed to fetch report detail");
  }

  return res.json();
}
