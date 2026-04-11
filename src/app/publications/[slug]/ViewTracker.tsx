"use client";

import { useEffect } from "react";
import { api } from "../../../lib/api"; // 👈 use existing api instance

export default function ViewTracker({ postId }: { postId: string }) {
  useEffect(() => {
    if (!postId) return;
    api.post(`/posts/${postId}/view`).catch(() => {});
  }, [postId]);

  return null;
}