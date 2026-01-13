import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ローカル開発用ユーザーを作成
  const user = await prisma.user.upsert({
    where: { cognitoId: "local-dev-user" },
    update: {},
    create: {
      cognitoId: "local-dev-user",
      email: "dev@example.com",
      name: "開発ユーザー",
    },
  });

  console.log("Created user:", user);

  // サンプル Todo を作成
  const todo = await prisma.todo.upsert({
    where: { id: "sample-todo-1" },
    update: {},
    create: {
      id: "sample-todo-1",
      title: "サンプルタスク",
      description: "これはテスト用のタスクです",
      completed: false,
      userId: user.id,
    },
  });

  console.log("Created todo:", todo);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
