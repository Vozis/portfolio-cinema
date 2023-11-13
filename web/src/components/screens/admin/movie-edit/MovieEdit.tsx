import localFont from 'next/dist/compiled/@next/font/dist/local';
import { log } from 'next/dist/server/typescript/utils';
import dynamic from 'next/dynamic';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import slugify from 'slugify';
import { stripHtml } from 'string-strip-html';

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation';
import Button from '@/ui/form-elements/Button';
import Field from '@/ui/form-elements/Field';
import formStyles from '@/ui/form-elements/admin-form.module.scss';
import SlugField from '@/ui/form-elements/slug-field/SlugField';
import FilesUploadField from '@/ui/form-elements/upload-field/FilesUploadField';
import UploadField from '@/ui/form-elements/upload-field/UploadField';
import Heading from '@/ui/heading/Heading';
import SkeletonLoader from '@/ui/skeleton/SkeletonLoader';

import { IFile } from '@/shared/types/movie.types';

import Meta from '@/utils/meta/Meta';

import { IMovieEditInput } from '@/screens/admin/movie-edit/movie-edit.interface';
import { useAdminActors } from '@/screens/admin/movie-edit/useAdminActor';
import { useAdminGenres } from '@/screens/admin/movie-edit/useAdminGenres';
import { useMovieEdit } from '@/screens/admin/movie-edit/useMovieEdit';

const DynamicSelect = dynamic(() => import('@/ui/select/Select'), {
  ssr: false,
});

const MovieEdit: FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm<IMovieEditInput>({
    mode: 'onChange',
  });
  // const [existPosters, setExistPosters] = useState<IFile[]>([]);
  // const [existBigPosters, setExistBigPosters] = useState<IFile[]>([]);
  // const [existVideos, setExistVideos] = useState<IFile[]>([]);

  const { isLoading, onSubmit, mutateAsync } = useMovieEdit(setValue);

  const { isLoading: isGenresLoading, data: genres } = useAdminGenres();
  const { isLoading: isActorsLoading, data: actors } = useAdminActors();

  // const handleClick = (file: IFile, type: string) => {
  //   const list = existPosters;
  //   const fileIndex = list.indexOf(file);
  //   if (fileIndex !== -1) {
  //     existPosters.splice(fileIndex, 1);
  //     setExistPosters(list);
  //   } else {
  //     setExistPosters(prev => [...prev, file]);
  //   }
  // };

  return (
    <Meta title={'Edit Movie'}>
      <AdminNavigation />
      <Heading title={'Изменить параметры фильма'} />
      <form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
        {isLoading ? (
          <SkeletonLoader count={3} />
        ) : (
          <>
            <div className={formStyles.fields}>
              <Field
                {...register('title', {
                  required: 'Title is required',
                })}
                placeholder={'Title'}
                error={errors.title}
              />
              <SlugField
                register={register}
                generate={() => {
                  setValue(
                    'slug',
                    slugify(getValues('title'), {
                      lower: true,
                      trim: true,
                    }),
                  );
                }}
                error={errors.slug}
              />
            </div>
            <div className={formStyles.fields}>
              <Field
                {...register('country', {
                  required: 'Country is required',
                })}
                placeholder={'Country'}
                error={errors.country}
                style={{
                  width: '31%',
                }}
              />
              <Field
                type={'number'}
                {...register('duration', {
                  required: 'Duration is required',
                })}
                placeholder={'Duration'}
                error={errors?.duration}
                style={{
                  width: '31%',
                }}
              />
              <Field
                type={'number'}
                {...register('year', {
                  required: 'Year is required',
                })}
                placeholder={'Year'}
                error={errors?.year}
                style={{
                  width: '31%',
                }}
              />
            </div>

            <Controller
              name={'genres'}
              control={control}
              rules={{
                required: 'Please select at least one genre',
              }}
              render={({ field, fieldState: { error } }) => (
                <DynamicSelect
                  options={genres || []}
                  field={field}
                  placeholder={'Choose genre...'}
                  isLoading={isGenresLoading}
                  isMulti={true}
                  error={error}
                />
              )}
            />

            <Controller
              name={'actors'}
              control={control}
              rules={{
                required: 'Please select at least one actor',
              }}
              render={({ field, fieldState: { error } }) => (
                <DynamicSelect
                  options={actors || []}
                  field={field}
                  placeholder={'Choose actors...'}
                  isLoading={isActorsLoading}
                  isMulti={true}
                  error={error}
                />
              )}
            />

            <div className={formStyles.fields}>
              <Controller
                name={'posters'}
                control={control}
                rules={{
                  required: 'Poster is required',
                }}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <UploadField
                    onChange={onChange}
                    placeholder={'Poster'}
                    error={error}
                    folder={'movies'}
                    value={value}
                  />
                )}
              />
              <Controller
                name={'bigPosters'}
                control={control}
                rules={{
                  required: 'Big poster is required',
                }}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <UploadField
                    onChange={onChange}
                    placeholder={'Big Poster'}
                    error={error}
                    folder={'movies'}
                    value={value}
                  />
                )}
              />
            </div>
            <Controller
              name={'videos'}
              control={control}
              rules={{
                required: 'Video is required',
              }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <UploadField
                  onChange={onChange}
                  placeholder={'Video'}
                  error={error}
                  folder={'movies'}
                  value={value}
                  isNoImage
                  style={{ marginTop: -25 }}
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

export default MovieEdit;
