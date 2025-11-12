// src/aws-exports.js
const awsmobile = {
  aws_project_region: "ap-south-1", // e.g., "us-east-1"
  aws_cognito_region: "ap-south-1",
  aws_user_pools_id: "ap-south-1_2GWT5ukzJ",
  aws_user_pools_web_client_id: "1idevg6hu804eje4pl59s3b042",
  API: {
    REST: {
      CloudStoreAPI: {
        endpoint:
          "https://f0mjjpyfac.execute-api.ap-south-1.amazonaws.com/prod",
        region: "ap-south-1",
      },
    },
  },
};
export default awsmobile;
