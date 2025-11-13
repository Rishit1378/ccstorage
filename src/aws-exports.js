// src/aws-exports.

const awsmobile = {
  aws_project_region: "ap-south-1", // e.g., "us-east-1"
  aws_cognito_region: "ap-south-1",
  aws_user_pools_id: "ap-south-1_MzPpksNam",
  aws_user_pools_web_client_id: "2rh73sq3jvqc6sal7l5u7e793p",
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
