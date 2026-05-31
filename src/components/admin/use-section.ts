"use client";
import { useEffect, useState } from "react";

export function useSection<T>(section: string, lang: string): T | null {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    setData(null);
    fetch(`/api/admin/content?section=${section}&lang=${lang}`)
      .then((r) => r.json())
      .then((j) => setData(j.data));
  }, [section, lang]);
  return data;
}
