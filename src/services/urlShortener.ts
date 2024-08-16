// src/services/urlShortener.ts
import { db, serverTimestamp } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export const shortenUrl = async (
  originalUrl: string,
  customUrl?: string,
  customDomain?: string
) => {
  const shortId = customUrl || generateShortId();
  const domain = customDomain || window.location.origin;
  const fullShortUrl = `${domain}/${shortId}`;

  await setDoc(doc(db, "urls", shortId), {
    originalUrl,
    createdAt: serverTimestamp(),
    clicks: 0,
    referrers: [],
  });

  return shortId;
};

const generateShortId = (): string => {
  return Math.random().toString(36).substr(2, 8);
};
