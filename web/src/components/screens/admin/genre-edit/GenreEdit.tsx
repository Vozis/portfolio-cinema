import { log } from 'next/dist/server/typescript/utils';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import slugify from 'slugify';
import { stripHtml } from 'string-strip-html';

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation';
import Button from '@/ui/form-elements/Button';
import Field from '@/ui/form-elements/Field';
import formStyles from '@/ui/form-elements/admin-form.module.scss';
import SlugField from '@/ui/form-elements/slug-field/SlugField';
import Heading from '@/ui/heading/Heading';
import SkeletonLoader from '@/ui/skeleton/SkeletonLoader';

import Meta from '@/utils/meta/Meta';

import { IGenreEditInput } from '@/screens/admin/genre-edit/genre-edit.interface';
import { useGenreEdit } from '@/screens/admin/genre-edit/useGenreEdit';

const DynamicTextEditor = dynamic(
  () => import('@/ui/form-elements/TextEditor'),
  { ssr: false },
);

const GenreEdit: FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm<IGenreEditInput>({
    mode: 'onChange',
  });

  const { isLoading, onSubmit, mutateAsync } = useGenreEdit(setValue);

  return (
    <Meta title={'Edit Genre'}>
      <AdminNavigation />
      <Heading title={'Изменить параметры жанра'} />
      <form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
        {isLoading ? (
          <SkeletonLoader count={3} />
        ) : (
          <>
            <div className={formStyles.fields}>
              <Field
                {...register('name', {
                  required: 'Name is required',
                })}
                placeholder={'Name'}
                error={errors.name}
                style={{
                  width: '31%',
                }}
              />
              <div style={{ width: '31%' }}>
                <SlugField
                  register={register}
                  generate={() => {
                    setValue(
                      'slug',
                      slugify(getValues('name'), {
                        lower: true,
                        trim: true,
                      }),
                    );
                  }}
                  error={errors.slug}
                />
              </div>
              <Field
                {...register('icon', {
                  required: 'Icon is required',
                })}
                placeholder={'Icon'}
                error={errors.name}
                style={{
                  width: '31%',
                }}
              />
            </div>
            <Controller
              name={'description'}
              control={control}
              defaultValue={''}
              rules={{
                validate: {
                  required: v =>
                    (v && stripHtml(v).result.length > 0) ||
                    'Description is required',
                },
              }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <DynamicTextEditor
                  onChange={onChange}
                  value={value}
                  error={error}
                  placeholder={'Description'}
                />
              )}
            />

            <Button>Update</Button>
          </>
        )}
      </form>
    </Meta>
  );
};

export default GenreEdit;
