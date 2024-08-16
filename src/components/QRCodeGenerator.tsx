import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import "./QRCodeGenerator.css"; 

interface QRCodeGeneratorProps {
  url: string;
  download?: boolean; // Marking download as optional
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ url, download }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  useEffect(() => {
    const generateQrCode = async () => {
      try {
        const qrCodeDataUrl = await QRCode.toDataURL(url);
        setQrCodeUrl(qrCodeDataUrl);
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };

    generateQrCode();
  }, [url]);

  return (
    <div className="qr-code-container">
      {qrCodeUrl ? (
        <>
          <img src={qrCodeUrl} alt="QR Code" className="qr-code-image" />
          {download && (
            <a
              href={qrCodeUrl}
              download="qr-code.png"
              className="download-link"
            >
              Download QR Code
            </a>
          )}
        </>
      ) : (
        <p className="loading-text">Generating QR Code...</p>
      )}
    </div>
  );
};

export default QRCodeGenerator;
