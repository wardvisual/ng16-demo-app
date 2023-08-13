export interface SupabaseResponse<T = any> {
  iSuccess: boolean;
  message: string;
  result?: T[];
}
