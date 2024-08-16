"use client";

import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import "./UrlAnalytics.css"; // Importing the CSS file

interface UrlAnalyticsProps {
  shortId: string;
}

const UrlAnalytics: React.FC<UrlAnalyticsProps> = ({ shortId }) => {
  const [clicks, setClicks] = useState<number>(0);
  const [referrers, setReferrers] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        console.log("Fetching analytics for shortId:", shortId);
        const docRef = doc(db, "urls", shortId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("Document data:", data);
          setClicks(data?.clicks || 0);
          setReferrers(data?.referrers || []);
        } else {
          console.error(`No document found for shortId: ${shortId}`);
          setError("No analytics data found for this URL.");
        }
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        setError("Failed to fetch analytics data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [shortId]);

  if (loading) {
    return <p>Loading analytics...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className="analytics-container">
      <h2 className="analytics-heading">Analytics for {shortId}</h2>
      <p className="analytics-clicks">Clicks: {clicks}</p>
      <p className="analytics-referrers">Referrers: {referrers.join(", ")}</p>
    </div>
  );
};

export default UrlAnalytics;
