// context/FormContext.tsx
"use client"; // Mark as client component if using App Router

import { createContext, useContext, useState, ReactNode } from "react";

interface FormData {
  name: string;
  id: string;
  email: string;
  section: string;
  department: string;
}

interface FormContextProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const useFormData = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormData must be used within a FormProvider");
  }
  return context;
};

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    id: "",
    email: "",
    section: "",
    department: "",
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};
