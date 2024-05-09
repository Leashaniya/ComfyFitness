// QRscanner.js
import React, { useRef, useState } from "react";
import QRCode from "qrcode.react";
import axios from "axios";
import { Scanner } from "@yudiel/react-qr-scanner";
import { Link } from "react-router-dom";

const QRscanner = ({ value }) => {
  //   const qrRef = useRef();
  const [packageDetails, setPackageDetails] = useState("");

  // const downloadQRCode = () => {
  //   const canvas = qrRef.current.querySelector("canvas");
  //   const pngUrl = canvas
  //     .toDataURL("image/png")
  //     .replace("image/png", "image/octet-stream");
  //   const downloadLink = document.createElement("a");
  //   downloadLink.href = pngUrl;
  //   downloadLink.download = "qr_code.png";
  //   downloadLink.click();
  // };
  const getResults = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:7505/payment/getCurrentPackage/${id}`
      );
      if (response.data.length) {
        setPackageDetails(response.data[0] || {});
      }
    } catch (error) {
      console.error("Error:", error.response?.data?.error || error.message);
    }
  };
  return (
    <>
    <Link to="/user/adminHome">
        <button>Back to home</button>
      </Link>
      <div style={{ width: "400px", height: "400px" }}>
        <Scanner onResult={(text, result) => getResults(text)} />
      </div>

      <div>
        {packageDetails.packageName && (
          <>
            <div className="package-section">
              <h3>Package Details</h3>
              <p>
                <strong>Package Name:</strong> {packageDetails.packageName}
              </p>
              <p>
                <strong>Expiration Date:</strong>{" "}
                {new Date(packageDetails.expirationDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Payment Amount:</strong> ${packageDetails.paymentAmount}
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default QRscanner;
