import { APIGatewayProxyResult } from "aws-lambda"

export function jsonResponse(
  statusCode: number,
  body: unknown
): APIGatewayProxyResult {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(body),
  }
}

export function successResponse(data: unknown): APIGatewayProxyResult {
  return jsonResponse(200, { success: true, data })
}

export function errorResponse(
  statusCode: number,
  message: string
): APIGatewayProxyResult {
  return jsonResponse(statusCode, { success: false, error: message })
}
