import { prisma } from "./prisma";

export async function getOrCreateUser(cognitoId: string, email?: string) {
  // 既存ユーザーを検索
  let user = await prisma.user.findUnique({
    where: { cognitoId },
  });

  // なければ作成
  if (!user) {
    user = await prisma.user.create({
      data: {
        cognitoId,
        email: email || `${cognitoId}@example.com`,
      },
    });
  }

  return user;
}
