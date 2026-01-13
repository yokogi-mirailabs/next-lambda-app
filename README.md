# Lambda Todo App

Lambda + Cognito + Amplify + RDS 構成の Todo アプリケーション

## 構成

```
┌─────────────────────────────────────────────────────────┐
│  Frontend (Next.js 静的出力)                             │
│  - Amplify Hosting                                      │
│  - Cognito 認証                                         │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  API Gateway + Lambda                                   │
│  - Cognito Authorizer                                   │
│  - Serverless Framework                                 │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  RDS (PostgreSQL) + Prisma                              │
└─────────────────────────────────────────────────────────┘
```

## セットアップ

### 1. Dev Container で起動（推奨）

VS Code で開き、「Reopen in Container」を選択

```bash
# コンテナ起動後、自動で pnpm install が実行される
```

### 2. 環境変数の設定

```bash
# Backend
cp backend/.env.example backend/.env

# Frontend
cp frontend/.env.example frontend/.env.local
```

### 3. データベースのセットアップ

```bash
cd backend
pnpm db:push
```

### 4. 開発サーバーの起動

```bash
# Frontend (別ターミナル)
pnpm dev:frontend

# Backend (別ターミナル)
pnpm dev:backend
```

## コマンド

| コマンド | 説明 |
|---------|------|
| `pnpm dev:frontend` | フロントエンド開発サーバー |
| `pnpm dev:backend` | バックエンド開発サーバー (serverless-offline) |
| `pnpm build:frontend` | フロントエンドビルド |
| `pnpm deploy:backend` | バックエンドデプロイ |
| `pnpm test` | テスト実行 |
| `pnpm test:e2e` | E2E テスト実行 |

## 技術スタック

- **Frontend**: Next.js, React, TailwindCSS, React Query
- **Backend**: Lambda, API Gateway, Serverless Framework
- **Database**: RDS (PostgreSQL), Prisma
- **Auth**: Cognito
- **Hosting**: Amplify
- **Testing**: Jest, MSW, Playwright
