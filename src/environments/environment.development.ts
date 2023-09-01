import customEnv from '../../custom-env';

export const environment = {
  production: false,
  apiUrl: 'http://localhost:4000/api/v1',

  //supabase
  supabaseUrl: customEnv.SUPABASE_URL,
  supabaseAnonKey: customEnv.SUPABASE_ANON_KEY,
};
