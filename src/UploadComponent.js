import React, { useState } from "react";
import { API } from "aws-amplify"; // Changed
import { fetchAuthSession } from "@aws-amplify/auth"; // Added
import axios from "axios";

// Simple styling, you can make this look like your slides
const uploadBoxStyle = {
  border: "2px dashed #aaa",
  padding: "50px 20px",
  textAlign: "center",
  cursor: "pointer",
  marginTop: "20px",
};

function UploadComponent() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState("Drop files here or click to browse");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setStatus(event.target.files[0].name);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setStatus("Getting upload URL...");
    try {
      // 1. Get the current user's auth token (v6 way)
      const session = await fetchAuthSession(); // Changed
      const token = session.tokens.idToken.toString(); // Changed

      // 2. Call our API Gateway to get the presigned URL
      const apiName = "CloudStoreAPI";
      const path = "/upload";
      const init = {
        headers: { Authorization: token },
        body: {
          fileName: selectedFile.name,
          fileType: selectedFile.type,
        },
      };
      const response = await API.post(apiName, path, init);
      const { uploadUrl } = response;

      setStatus("Uploading file...");

      // 3. Upload the file directly to S3 using the presigned URL
      await axios.put(uploadUrl, selectedFile, {
        headers: { "Content-Type": selectedFile.type },
      });

      setStatus("Upload successful! Select another file.");
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      setStatus("Upload failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Secure Cloud File Storage</h2>
      <p>Store, manage, and access your files securely in the cloud.</p>

      <input
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="file-upload"
      />
      <label htmlFor="file-upload" style={uploadBoxStyle}>
        <p>{status}</p>
      </label>

      <button
        onClick={handleUpload}
        style={{ width: "100%", padding: "10px", marginTop: "10px" }}
      >
        Upload Files
      </button>
    </div>
  );
}

export default UploadComponent;
