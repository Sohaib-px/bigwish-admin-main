'use client';

import type { User } from '@/types/user';
import axios from 'axios';
import { logger } from '../default-logger';
import * as dotenv from "dotenv";
dotenv.config();

function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

const user = {
  id: 'USR-000',
  avatar: '/assets/avatar.png',
  firstName: 'Sofia',
  lastName: 'Rivers',
  email: 'sofia@devias.io',
} satisfies User;

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

class AuthClient {
  async signUp(_: SignUpParams): Promise<{ error?: string }> {
    // Make API request

    // We do not handle the API, so we'll just generate a token and store it in localStorage.
    const token = generateToken();
    localStorage.setItem('custom-auth-token', token);

    return {};
  }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: 'Social authentication not implemented' };
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    const { email: login, password } = params;
    try {
      // const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_API_ROUTES_PREFIX}/auth/login`;
      const url = "http://localhost:8000/api/auth/login";
      logger.debug("url:", url);
      const response = await axios.post("https://drdc-api-717c5d9fc784.herokuapp.com/api/auth/login", {
        login,
        password,
        firebaseToken: "nOfirEbASeTokenForLOGInAdmIN",
        deviceType: "ios",
        deviceToken: "nOdeVIceTokenForLOGInAdmIN"
      },

      {
        headers: {
          'content-type': 'application/json'
        },
        withCredentials: true
      }
      );
      localStorage.setItem('custom-auth-token', response.data.accessToken);
      return {};
    } catch (error) {

      return { error: "Login failed." };
    }
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Password reset not implemented' };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Update reset not implemented' };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    // Make API request

    // We do not handle the API, so just check if we have a token in localStorage.
    const token = localStorage.getItem('custom-auth-token');

    if (!token) {
      return { data: null };
    }

    return { data: user };
  }

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('custom-auth-token');

    return {};
  }
}

export const authClient = new AuthClient();
