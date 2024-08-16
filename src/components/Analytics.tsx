"use client";

import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

interface UrlAnalyticsProps {
  shortId: string;
}

const UrlAnalytics: React.FC<UrlAnalyticsProps> = ({ shortId }) => {
  const [clicks, setClicks] = useState<number>(0);
  const [referrers, setReferrers] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const docRef = doc(db, "urls", shortId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setClicks(data?.clicks || 0);
          setReferrers(data?.referrers || []);
        }
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [shortId]);

  if (loading) {
    return <p>Loading analytics...</p>;
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Analytics for {shortId}</h2>
      <p className="mt-2">Clicks: {clicks}</p>
      <p className="mt-2">Referrers: {referrers.join(", ")}</p>
    </div>
  );
};

export default UrlAnalytics;
