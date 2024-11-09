"use client";
import { Field, FieldProps, ErrorMessage } from "formik";
import Select from "react-dropdown-select";
import React from "react";

interface Option {
  value: string; // Adjust based on the type of values in your options
  name: string;
}

interface DropdownProps {
  label?: string;
  options: Option[];
  placeholder?: string;
  searchable?: boolean;
  name: string;
  multi?: boolean;
  prefix?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  placeholder = "Select...",
  searchable = false,
  name,
  multi = false,
  prefix,
}) => {
  return (
    <div
      className={`reactDropdownSelect-container 
    ${prefix && `${prefix}-reactDropdownSelect-container`}`}
    >
      {label && <p className="mb-4">{label}</p>}
      <Field name={name}>
        {({ field, form }: FieldProps<string | string[]>) => {
          const selectedValues = multi
            ? options.filter((option) =>
                Array.isArray(field.value)
                  ? field.value.includes(option.value)
                  : false
              )
            : options.filter((option) => option.value === field.value);

          return (
            <Select
              className="react-dropdown-select-custom-style"
              dropdownPosition="auto"
              labelField="name"
              multi={multi}
              options={options}
              placeholder={placeholder}
              searchable={searchable}
              valueField="value"
              values={selectedValues}
              onChange={(value) => {
                const selectedValue = multi
                  ? value.map((v) => v.value)
                  : value[0]?.value;

                form.setFieldValue(name, selectedValue);
              }}
            />
          );
        }}
      </Field>
      <ErrorMessage className="text-danger" component="p" name={name} />
    </div>
  );
};

export default Dropdown;
