import cn from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { IGalleryItemProps } from '@/ui/gallery/gallery.interface';

import styles from './Gallery.module.scss';

const GalleryItem: FC<IGalleryItemProps> = ({ item, variant }) => {
  return (
    <Link
      href={item.link}
      className={cn(styles.item, {
        [styles.withText]: item.content,
        [styles.horizontal]: variant === 'horizontal',
        [styles.vertical]: variant === 'vertical',
      })}
    >
      <Image
        src={item.posterPath}
        alt={item.name}
        fill={true}
        draggable={true}
        priority
        style={{
          objectFit: 'cover',
        }}
      />
      {item.content && (
        <div className={styles.content}>
          <h3 className={styles.title}>{item.content.title}</h3>
          {item.content.subTitle && (
            <div className={styles.subTitle}>{item.content.subTitle}</div>
          )}
        </div>
      )}
    </Link>
  );
};

export default GalleryItem;
