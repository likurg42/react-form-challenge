export type SubmitFormValues = Omit<MainFormValues, 'hasPhone'>;

export interface MainFormValues {
  firstName: string;
  lastName: string;
  email: string;
  hasPhone: false,
  phoneNumber?: number;
  files?: File[];
}
