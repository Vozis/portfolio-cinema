import { FC } from 'react';

import GalleryItem from '@/ui/gallery/GalleryItem';
import {
  IGalleryItem,
  IGalleryItemProps,
} from '@/ui/gallery/gallery.interface';

import styles from './Gallery.module.scss';

const Gallery: FC<{ items: IGalleryItem[] }> = ({ items }) => {
  return (
    <div className={styles.gallery}>
      {items.length ? (
        items.map(item => (
          <GalleryItem key={item.link} item={item} variant={'vertical'} />
        ))
      ) : (
        <div className={styles.content}>
          <div className={'text-lg text-white text-opacity-60'}>
            Элементов не найдено...
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
