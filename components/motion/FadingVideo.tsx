"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

const FADE_MS = 500;
const FADE_OUT_LEAD = 0.55;

export default function FadingVideo({
  src,
  className,
  style,
}: {
  src: string;
  className?: string;
  style?: CSSProperties;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const fadingOutRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    function fadeTo(target: number, duration: number) {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      const start = parseFloat(video!.style.opacity) || 0;
      const startTime = performance.now();
      const step = (now: number) => {
        const p = Math.min((now - startTime) / duration, 1);
        video!.style.opacity = String(start + (target - start) * p);
        rafRef.current = p < 1 ? requestAnimationFrame(step) : null;
      };
      rafRef.current = requestAnimationFrame(step);
    }

    function onLoadedData() {
      video!.style.opacity = "0";
      video!.play().catch(() => {});
      fadeTo(1, FADE_MS);
    }

    function onTimeUpdate() {
      const remaining = video!.duration - video!.currentTime;
      if (!fadingOutRef.current && remaining <= FADE_OUT_LEAD && remaining > 0) {
        fadingOutRef.current = true;
        fadeTo(0, FADE_MS);
      }
    }

    let endedTimeout: ReturnType<typeof setTimeout> | null = null;
    function onEnded() {
      video!.style.opacity = "0";
      endedTimeout = setTimeout(() => {
        video!.currentTime = 0;
        video!.play().catch(() => {});
        fadingOutRef.current = false;
        fadeTo(1, FADE_MS);
      }, 100);
    }

    video.addEventListener("loadeddata", onLoadedData);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);

    let hls: import("hls.js").default | null = null;
    let cancelled = false;

    if (src.endsWith(".m3u8")) {
      // Prefer hls.js (MediaSource) wherever it's actually supported — this is
      // more reliable than trusting canPlayType, which some engines report
      // truthy for without being able to decode HLS at all. Fall back to
      // native playback (real Safari) only when MSE isn't available.
      import("hls.js").then(({ default: Hls }) => {
        if (cancelled) return;
        if (Hls.isSupported()) {
          hls = new Hls();
          hls.loadSource(src);
          hls.attachMedia(video);
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = src;
        }
      });
    } else {
      video.src = src;
    }

    return () => {
      cancelled = true;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (endedTimeout) clearTimeout(endedTimeout);
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
      hls?.destroy();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      preload="auto"
      className={className}
      style={{ opacity: 0, ...style }}
    />
  );
}
