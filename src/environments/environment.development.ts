import customEnv from '../../custom-env';

/**
 * @desc Alternatively, I created a `customEnv.js` file at the root of the project and put it in .gitignore. Just to make things easier.
 * */
export const environment = {
  production: false,
  supabaseUrl: customEnv.SUPABASE_URL,
  supabaseAnonKey: customEnv.SUPABASE_ANON_KEY,
};
