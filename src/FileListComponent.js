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
      window.open(response.downloadUrl, "_blank");
    } catch (error) {
      console.error("Error getting download link:", error);
    }
  };

  const handleDelete = async (fileId, s3Key) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;

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
