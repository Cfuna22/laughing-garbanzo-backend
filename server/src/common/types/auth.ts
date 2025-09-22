export type SupabaseJwtPayload = {
  sub: string; // Supabase auth user id (UUID)
  email?: string;
  role?: string; // "authenticated" for end-users
  exp: number;
  iat: number;
  // custom claims (if any)
  [key: string]: any;
};

export type RequestUser = {
  id: string; // supabase id
  email?: string;
  role: 'admin' | 'staff' | 'customer';
};
