import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';

import Button from '@/ui/form-elements/Button';
import { ISlide } from '@/ui/slider/slider.interface';

import styles from './slider.module.scss';

interface ISlideItem {
  slide: ISlide;
  buttonTitle?: string;
}

const SlideItem: FC<ISlideItem> = ({ slide, buttonTitle = 'Watch' }) => {
  const { push } = useRouter();
  return (
    <div className={styles.slide}>
      {slide.bigPoster && (
        <Image
          src={slide.bigPoster}
          alt={slide.title}
          draggable={false}
          unoptimized
          priority
          fill={true}
          style={{ objectFit: 'cover' }}
        />
      )}

      <div className={styles.content}>
        <div className={styles.heading}>{slide.title}</div>
        <div className={styles.subHeading}>{slide.subTitle}</div>
        <Button className={styles.button} onClick={() => push(slide.link)}>
          {buttonTitle}
        </Button>
      </div>
    </div>
  );
};

export default SlideItem;
