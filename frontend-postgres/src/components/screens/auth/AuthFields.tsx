import { FC } from 'react';
import { FieldError, FormState, UseFormRegister } from 'react-hook-form';
import Field from '@/ui/form-elements/Field';
import { validEmail } from '@/shared/regex';

interface IAuthFields {
  register: UseFormRegister<any>;
  formState: FormState<any>;
  isPasswordRequired?: boolean;

}

const AuthFields: FC<IAuthFields> = ({
  register,
  formState: { errors },
  isPasswordRequired = false,
}) => {
  return (
    <>
      <Field
        {...register('email', {
          // required: false,
          // pattern: {
          //   value: validEmail,
          //   message: 'Please enter a valid email address',
          // },
        })}
        placeholder={'E-mail'}
        error={errors.email}
        type={'email'}
      />
      <Field
        type={'password'}
        {...register(
          'password',
          isPasswordRequired
            ? {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              }
            : {},
        )}
        placeholder={'password'}
        error={errors.password}
      />
    </>
  );
};

export default AuthFields;
