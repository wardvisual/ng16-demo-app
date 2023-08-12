import customEnv from '../../custom-env';

export const environment = {
  production: false,
  apiUrl: `http://localhost:3000`,
  supabaseUrl: customEnv.SUPABASE_URL,
  supabaseAnonKey: customEnv.SUPABASE_ANON_KEY,
};
