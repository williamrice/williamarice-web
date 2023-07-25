export interface ContactFormState {
  name: string;
  email: string;
  message: string;
  formError: { isError: boolean; message: string };
  formSuccess: boolean;
  isLoading?: boolean;
}
