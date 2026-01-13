// Cognito 設定（後で実装）
export const cognitoConfig = {
  userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "",
  userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || "",
  region: process.env.NEXT_PUBLIC_AWS_REGION || "ap-northeast-1",
}
