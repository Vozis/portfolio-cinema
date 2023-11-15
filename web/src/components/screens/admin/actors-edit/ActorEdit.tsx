import cn from 'clsx';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import slugify from 'slugify';

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

import { IActorEditInput } from '@/screens/admin/actors-edit/actor-edit.interface';
import { useActorEdit } from '@/screens/admin/actors-edit/useActorEdit';

const ActorEdit: FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm<IActorEditInput>({
    mode: 'onChange',
  });
  const [existFiles, setExistFiles] = useState<IFile[]>([]);

  const { isLoading, onSubmit, files } = useActorEdit(setValue, existFiles);

  const handleClick = (file: IFile) => {
    // setExistFiles(prev => [file, ...prev]);
    const list = existFiles;
    const fileIndex = list.indexOf(file);
    if (fileIndex !== -1) {
      existFiles.splice(fileIndex, 1);
      setExistFiles(list);
    } else {
      console.log('file from handleClick: ', file);
      setExistFiles(prev => [file,...prev]);
    }
  };


  return (
    <Meta title={'Edit Actor'}>
      <AdminNavigation />
      <Heading title={'Изменить данные актера'} />
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
              />

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

            <Controller
              name={'photos'}
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <UploadField
                  onChange={onChange}
                  placeholder={'Photo'}
                  error={error}
                  folder={'actors'}
                  value={value}
                />
              )}
            />

            <section className={'flex gap-2 overflow-x-auto items-stretch'}>
              {files?.length
                ? files.map(file => (
                    <div
                      key={file.id}
                      onClick={() => handleClick(file)}
                      className={cn(
                        'shrink-0 relative h-20 w-20 cursor-pointer',
                        {
                          'before:absolute before:bottom-2 before:right-2 before:content-["✅"] before:z-10 before:w-4 before:h-4':
                            existFiles.some(item => file.id === item.id),
                        },
                      )}
                    >
                      <Image
                        src={file.url}
                        alt={file.name}
                        fill
                        className={cn(
                          'rounded-md object-contain image-like-bg',
                        )}
                        unoptimized
                      />
                    </div>
                  ))
                : ''}
            </section>

            <Button>Обновить</Button>
          </>
        )}
      </form>
    </Meta>
  );
};

export default ActorEdit;
