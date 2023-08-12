import customEnv from '../../custom-env';

export const environment = {
  production: false,
  supabaseUrl: customEnv.SUPABASE_URL,
  supabaseAnonKey: customEnv.SUPABASE_ANON_KEY,
};
