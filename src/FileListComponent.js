import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";

function FileListComponent() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const session = await Auth.currentSession();
      const token = session.getIdToken().getJwtToken();

      const apiName = "CloudStoreAPI";
      const path = "/files";
      const init = { headers: { Authorization: token } };

      const response = await API.get(apiName, path, init);
      setFiles(response);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
    setLoading(false);
  };

  const handleDownload = async (s3Key) => {
    try {
      const session = await Auth.currentSession();
      const token = session.getIdToken().getJwtToken();

      const apiName = "CloudStoreAPI";
      const path = "/download";
      const init = {
        headers: { Authorization: token },
        queryStringParameters: { s3Key: s3Key },
      };

      const response = await API.get(apiName, path, init);
      // Open the secure download URL in a new tab
      window.open(response.downloadUrl, "_blank");
    } catch (error) {
      console.error("Error getting download link:", error);
    }
  };

  const handleDelete = async (fileId, s3Key) => {
    try {
      const session = await Auth.currentSession();
      const token = session.getIdToken().getJwtToken();

      const apiName = "CloudStoreAPI";
      const path = "/file";
      const init = {
        headers: { Authorization: token },
        body: { fileId: fileId, s3Key: s3Key },
      };

      await API.del(apiName, path, init);
      // Refresh the file list
      fetchFiles();
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  if (loading) return <p>Loading files...</p>;

  return (
    <div>
      <h3>My Files</h3>
      {files.length === 0 ? (
        <p>No files yet. Upload your first file!</p>
      ) : (
        <ul>
          {files.map((file) => (
            <li key={file.fileId}>
              {file.fileName}
              <button onClick={() => handleDownload(file.s3Key)}>
                Download
              </button>
              <button onClick={() => handleDelete(file.fileId, file.s3Key)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
