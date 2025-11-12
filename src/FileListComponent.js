import React, { useState, useEffect } from "react";
import { get, del } from "@aws-amplify/api"; // Changed: Import 'get' and 'del'
import { fetchAuthSession } from "@aws-amplify/auth";

function FileListComponent() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const session = await fetchAuthSession();
      const token = session.tokens.idToken.toString();

      const apiName = "CloudStoreAPI";
      const path = "/files";

      // New v6 GET call
      const response = await get({
        apiName: apiName,
        path: path,
        options: {
          headers: { Authorization: token },
        },
      }).response;

      const body = await response.body.json(); // Get the JSON body
      setFiles(body); // Set files from the parsed body
    } catch (error) {
      console.error("Error fetching files:", error);
    }
    setLoading(false);
  };

  const handleDownload = async (s3Key) => {
    try {
      const session = await fetchAuthSession();
      const token = session.tokens.idToken.toString();

      const apiName = "CloudStoreAPI";
      const path = "/download";

      // New v6 GET call
      const response = await get({
        apiName: apiName,
        path: path,
        options: {
          headers: { Authorization: token },
          queryStringParameters: { s3Key: s3Key },
        },
      }).response;

      const body = await response.body.json();
      window.open(body.downloadUrl, "_blank");
    } catch (error) {
      console.error("Error getting download link:", error);
    }
  };

  const handleDelete = async (fileId, s3Key) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;

    try {
      const session = await fetchAuthSession();
      const token = session.tokens.idToken.toString();

      const apiName = "CloudStoreAPI";
      const path = "/file";

      // New v6 DELETE call
      await del({
        // Changed from API.del
        apiName: apiName,
        path: path,
        options: {
          headers: { Authorization: token },
          body: { fileId: fileId, s3Key: s3Key },
        },
      }).response;

      fetchFiles(); // Refresh the file list
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  if (loading) return <p>Loading files...</p>;

  return (
    <div>
      <h2>My Files</h2>
      <button onClick={fetchFiles}>Refresh</button>
      <hr />
      {files.length === 0 ? (
        <div>
          <p>No files yet. Upload your first file!</p>
        </div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {files.map((file) => (
            <li
              key={file.fileId}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                margin: "5px",
              }}
            >
              {file.fileName}
              <button
                onClick={() => handleDownload(file.s3Key)}
                style={{ float: "right", marginLeft: "10px" }}
              >
                Download
              </button>
              <button
                onClick={() => handleDelete(file.fileId, file.s3Key)}
                style={{ float: "right", color: "red" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FileListComponent;
