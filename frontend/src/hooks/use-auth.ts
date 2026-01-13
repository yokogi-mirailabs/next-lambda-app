"use client";

import { useState, useEffect, useCallback } from "react";
import {
  signIn,
  signUp,
  signOut,
  confirmSignUp,
  getCurrentUser,
  fetchAuthSession,
} from "aws-amplify/auth";

type AuthUser = {
  userId: string;
  email: string;
};

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 現在のユーザーを取得
  const checkUser = useCallback(async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser({
        userId: currentUser.userId,
        email: currentUser.signInDetails?.loginId || "",
      });
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  // サインアップ
  const handleSignUp = async (email: string, password: string) => {
    const result = await signUp({
      username: email,
      password,
      options: {
        userAttributes: { email },
      },
    });
    return result;
  };

  // 確認コード送信
  const handleConfirmSignUp = async (email: string, code: string) => {
    await confirmSignUp({ username: email, confirmationCode: code });
  };

  // サインイン
  const handleSignIn = async (email: string, password: string) => {
    await signIn({ username: email, password });
    await checkUser();
  };

  // サインアウト
  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };

  // JWT トークン取得
  const getAccessToken = async (): Promise<string | null> => {
    try {
      const session = await fetchAuthSession();
      return session.tokens?.accessToken?.toString() || null;
    } catch {
      return null;
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    signUp: handleSignUp,
    confirmSignUp: handleConfirmSignUp,
    signIn: handleSignIn,
    signOut: handleSignOut,
    getAccessToken,
  };
}
