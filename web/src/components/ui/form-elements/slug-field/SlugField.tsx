import { FC } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

import Field from '@/ui/form-elements/Field';

interface ISlugField {
  error?: FieldError;
  register: UseFormRegister<any>;
  generate: () => void;
}

const SlugField: FC<ISlugField> = ({ generate, register, error }) => {
  return (
    <div className={'relative'}>
      <Field {...register('slug')} placeholder={'Slug'} error={error} />

      <button
        type={'button'}
        className={
          'uppercase absolute top-6 right-3 cursor-pointer rounded-lg py-0.5 px-2 transition-colors border-gray-500 bg-gray-500 hover:bg-gray-300 text-xs text-gray-800'
        }
        onClick={generate}
      >
        Сгенерировать
      </button>
    </div>
  );
};

export default SlugField;
