// src/aws-exports.js
const awsmobile = {
  aws_project_region: "ap-south-1", // e.g., "us-east-1"
  aws_cognito_region: "ap-south-1",
  aws_user_pools_id: "ap-south-1_Tzy7BhW08",
  aws_user_pools_web_client_id: "4blumjvro57ukdjp7678bdj135",
  aws_cloud_logic_custom: [
    {
      name: "CloudStoreAPI",
      endpoint: "https://f0mjjpyfac.execute-api.ap-south-1.amazonaws.com/prod", // The URL from API Gateway
      region: "ap-south-1",
    },
  ],
};
export default awsmobile;
