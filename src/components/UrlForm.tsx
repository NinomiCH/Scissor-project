// src/components/UrlForm.tsx
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { shortenUrl } from "../services/urlShortener";
import QRCodeGenerator from "./QRCodeGenerator";
import UrlAnalytics from "./UrlAnalytics";
import "./UrlForm.css";

const schema = yup.object().shape({
  originalUrl: yup.string().url().required("Please enter a valid URL"),
  customUrl: yup.string().optional(),
  customDomain: yup.string().optional().url("Please enter a valid URL"),
});

const UrlForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [shortId, setShortId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: {
    originalUrl: string;
    customUrl?: string;
    customDomain?: string;
  }) => {
    try {
      const shortId = await shortenUrl(
        data.originalUrl,
        data.customUrl,
        data.customDomain
      );
      setShortId(shortId);
      setError(null);
    } catch (error: any) {
      const errorMessage =
        error.message || "An error occurred. Please try again.";
      setError(errorMessage);
    }
  };

  return (
    <div className="url-form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="url-form">
        <input
          {...register("originalUrl")}
          placeholder="Enter Long URL"
          className="input-field"
        />
        {errors.originalUrl && (
          <p className="error-text">{errors.originalUrl.message}</p>
        )}
        <input
          {...register("customUrl")}
          placeholder="Enter custom short URL (optional)"
          className="input-field"
        />
        {errors.customUrl && (
          <p className="error-text">{errors.customUrl.message}</p>
        )}
        <input
          {...register("customDomain")}
          placeholder="Enter custom domain (optional)"
          className="input-field"
        />
        {errors.customDomain && (
          <p className="error-text">{errors.customDomain.message}</p>
        )}
        <button type="submit" className="submit-button">
          Shorten
        </button>
      </form>
      {shortId && (
        <div className="result-section">
          <p className="short-url">
            Short URL:{" "}
            <a
              href={`${window.location.origin}/${shortId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="short-url-link"
            >
              {`${window.location.origin}/${shortId}`}
            </a>
          </p>

          <QRCodeGenerator
            url={`${window.location.origin}/${shortId}`}
            download={true}
          />
          <UrlAnalytics shortId={shortId} />
        </div>
      )}
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default UrlForm;
