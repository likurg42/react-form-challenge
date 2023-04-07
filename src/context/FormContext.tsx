import React, {
  PropsWithChildren, useCallback, useMemo, useState,
} from 'react';
import { MainFormValues } from '../types/form';

interface FormContextData {
  data: MainFormValues;
  setValues: (values: Partial<MainFormValues>) => void;
  resetValues: () => void;
}

export const FormContext = React.createContext<FormContextData | null>(null);

const initalFormValues: MainFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  hasPhone: false,
};

export const FormContextProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [data, setData] = useState<MainFormValues>(initalFormValues);

  const setValues = useCallback((values: Partial<MainFormValues>) => {
    setData((state) => ({ ...state, ...values }));
  }, [setData]);

  const resetValues = useCallback(() => {
    setData(initalFormValues);
  }, []);

  const value = useMemo(() => ({
    data,
    setValues,
    resetValues,
  }), [data, setValues, resetValues]);

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
};
