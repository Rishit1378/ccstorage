import React, { useState } from "react";
import { API, Auth } from "aws-amplify";
import axios from "axios"; // Use axios for the S3 upload

function UploadComponent() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState("Select a file");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setStatus("Getting upload URL...");
    try {
      // 1. Get the current user's auth token
      const session = await Auth.currentSession();
      const token = session.getIdToken().getJwtToken();

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

      setStatus("Upload successful!");
      // You might also want to call the `confirm-upload` Lambda here
      // to update the DynamoDB status from PENDING to COMPLETED.
    } catch (error) {
      console.error("Error uploading file:", error);
      setStatus("Upload failed.");
    }
  };

  return (
    <div>
      {/* Your UI from slide 45 */}
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{status}</p>
    </div>
  );
}
