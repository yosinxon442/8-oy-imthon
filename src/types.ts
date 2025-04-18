// types.ts

export interface User {
  phone: string;
  token: string;
  // You can add more user fields here if the API returns them
  // For example:
  // name?: string;
  // email?: string;
  // role?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  available: boolean;
  // Additional book fields if needed:
  // publishedYear?: number;
  // category?: string;
  // coverImage?: string;
}

export interface Library {
  id: string;
  name: string;
  address: string;
  phone: string;
  image: string;
  description: string;
  books: Book[];
  // Additional library fields if needed:
  // openingHours?: string;
  // location?: {
  //   lat: number;
  //   lng: number;
  // };
}

// If you need API response types
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  success: boolean;
  // statusCode?: number;
}

// If you need error response type
export interface ApiError {
  message: string;
  status?: number;
  // errors?: Record<string, string[]>;
}

// If you need login response specifically
export interface LoginResponse {
  token: string;
  user: User;
  // expiresIn?: number;
  // refreshToken?: string;
}