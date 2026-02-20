"use client";

import { InputFieldsForm } from "./InputFieldsForm";
import { SelectInputsForm } from "./SelectInputsForm";
import { TextareaForm } from "./TextareaForm";
import { ColorPickerForm } from "./ColorPickerForm";
import { FormValidationForm } from "./FormValidationForm";
import { FileUploadForm } from "./FileUploadForm";
import { CheckboxesForm } from "./CheckboxesForm";
import { RadioButtonsForm } from "./RadioButtonsForm";
import { ToggleSwitchForm } from "./ToggleSwitchForm";
import { DatePickerForm } from "./DatePickerForm";
import { SlidersForm } from "./SlidersForm";

export const FormsView = () => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 items-start">
      <h1 className="sr-only">Forms</h1>
      {/* Left Column */}
      <div className="flex flex-col gap-6">
        <InputFieldsForm />
        <SelectInputsForm />
        <TextareaForm />
        <ColorPickerForm />
        <FormValidationForm />
      </div>

      {/* Right Column */}
      <div className="flex flex-col gap-6">
        <FileUploadForm />
        <CheckboxesForm />
        <RadioButtonsForm />
        <ToggleSwitchForm />
        <DatePickerForm />
        <SlidersForm />
      </div>
    </div>
  );
};
