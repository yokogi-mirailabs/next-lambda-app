"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";

type Step = "signup" | "confirm";

export default function SignupPage() {
  const [step, setStep] = useState<Step>("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmCode, setConfirmCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, confirmSignUp, signIn } = useAuth();
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await signUp(email, password);
      setStep("confirm");
    } catch (err) {
      setError(err instanceof Error ? err.message : "登録に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await confirmSignUp(email, confirmCode);
      await signIn(email, password);
      router.push("/todos");
    } catch (err) {
      setError(err instanceof Error ? err.message : "確認に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  if (step === "confirm") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow">
          <h1 className="text-2xl font-bold text-center mb-6">
            確認コード入力
          </h1>
          <p className="text-sm text-gray-600 mb-4 text-center">
            {email} に送信された確認コードを入力してください
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleConfirm} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                確認コード
              </label>
              <input
                type="text"
                value={confirmCode}
                onChange={(e) => setConfirmCode(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {isLoading ? "確認中..." : "確認"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center mb-6">新規登録</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              メールアドレス
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              パスワード（8文字以上）
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? "登録中..." : "登録"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          すでにアカウントをお持ちの方は{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            ログイン
          </Link>
        </p>
      </div>
    </div>
  );
}
