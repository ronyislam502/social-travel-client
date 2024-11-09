import React from "react";
import { Field } from "formik";

interface TextareaProps {
  name: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
  name,
  label,
  defaultValue,
  required = false,
  placeholder,
}) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label className="font-medium mb-2" htmlFor={name}>
          {label}
        </label>
      )}
      <Field
        as="textarea"
        className="max-h-[100px] min-h-[100px] border rounded-md p-3"
        defaultValue={defaultValue}
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default Textarea;
