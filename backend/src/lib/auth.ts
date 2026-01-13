import { APIGatewayProxyEventV2WithJWTAuthorizer } from "aws-lambda";

export function getUserIdFromEvent(
  event: APIGatewayProxyEventV2WithJWTAuthorizer
): string | null {
  // ローカル開発時（serverless-offline）
  if (process.env.IS_OFFLINE === "true") {
    // Authorization ヘッダーから JWT を取得して sub を抽出
    const authHeader =
      event.headers?.authorization || event.headers?.Authorization;
    if (authHeader) {
      try {
        const token = authHeader.replace("Bearer ", "");
        // JWT の payload 部分をデコード（署名検証はしない - ローカル用）
        const payload = JSON.parse(
          Buffer.from(token.split(".")[1], "base64").toString()
        );
        return payload.sub || null;
      } catch {
        return null;
      }
    }
    return null;
  }

  // 本番環境（API Gateway + Cognito Authorizer）
  const claims = event.requestContext?.authorizer?.jwt?.claims;
  return claims?.sub as string | null;
}
