// src/app/[shortId]/page.tsx
"use client";

import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import "./ShortIdPage.css"; // Import the CSS file

const ShortIdPage = ({ params }: { params: { shortId: string } }) => {
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const shortId = params.shortId;

  useEffect(() => {
    const fetchAndTrackUrl = async () => {
      try {
        const docRef = doc(db, "urls", shortId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setOriginalUrl(data?.originalUrl || null);

          const referrer = document.referrer || "direct";
          await updateDoc(docRef, {
            clicks: increment(1),
            referrers: arrayUnion(referrer),
          });

          const updatedDocSnap = await getDoc(docRef);
          const updatedData = updatedDocSnap.data();
          if (updatedData) {
            console.log("Updated Clicks:", updatedData.clicks);
          }
        } else {
          setError("No such document!");
        }
      } catch (error) {
        console.error("Error updating and retrieving document:", error);
        setError("Error retrieving URL.");
      } finally {
        setLoading(false);
      }
    };

    fetchAndTrackUrl();
  }, [shortId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!originalUrl) {
    return <div className="no-url">Loading original URL...</div>;
  }

  return (
    <div className="container">
      <h1>Original URL:</h1>
      <a href={originalUrl} target="_blank" rel="noopener noreferrer">
        {originalUrl}
      </a>
    </div>
  );
};

export default ShortIdPage;
