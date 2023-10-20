import Link from 'next/link';
import { FC, Fragment } from 'react';

import styles from './ContentList.module.scss';
import { IContentList } from '@/screens/single-movie/content/content.interface';

const ContentList: FC<IContentList> = ({ name, links }) => {
  return (
    <div className={styles.list}>
      <div className={styles.name}>{name}</div>
      <div className={styles.links}>
        {links.map((item, index) => (
          <Fragment key={index}>
            <Link href={item.link}>{item.title}</Link>
            {index + 1 !== links.length ? ', ' : ''}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default ContentList;
