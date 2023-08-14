export interface SupabaseResponse<T = any> {
  isSuccess: boolean;
  message: string;
  result?: T[] | T;
}
