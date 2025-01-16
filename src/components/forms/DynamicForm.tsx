import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'file';
  required?: boolean;
  placeholder?: string;
}

interface DynamicFormProps {
  fields: FormField[];
  onSubmit: (data: any) => Promise<void>;
  formTitle: string;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({ fields, onSubmit, formTitle }) => {
  // Generate dynamic schema based on fields
  const schemaObj: any = {};
  fields.forEach((field) => {
    let validator = z.string();
    if (field.required) {
      validator = validator.min(1, `${field.label} is required`);
    }
    if (field.type === 'email') {
      validator = validator.email('Invalid email address');
    }
    schemaObj[field.name] = field.required ? validator : validator.optional();
  });

  const schema = z.object(schemaObj);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const handleFormSubmit = async (data: any) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-primary mb-6">{formTitle}</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                {...register(field.name)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder={field.placeholder}
                rows={4}
              />
            ) : (
              <input
                type={field.type}
                {...register(field.name)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder={field.placeholder}
              />
            )}
            {errors[field.name] && (
              <p className="mt-1 text-sm text-red-600">
                {errors[field.name]?.message as string}
              </p>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};