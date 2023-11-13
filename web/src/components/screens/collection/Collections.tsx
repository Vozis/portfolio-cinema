import { FC } from 'react';

import Description from '@/ui/heading/Description';
import Heading from '@/ui/heading/Heading';

import Meta from '@/utils/meta/Meta';

import styles from './Collection.module.scss';
import CollectionItem from '@/screens/collection/CollectionItem';
import { ICollection } from '@/screens/collection/collection.interface';

const title = 'Коллекции';
const description = 'Здесь собраны все фильмы по жанрам.';

const Collections: FC<{ collections: ICollection[] }> = ({ collections }) => {
  return (
    <Meta title={title} description={description}>
      <Heading title={title} className={styles.heading} />
      <Description text={description} className={styles.description} />

      <section className={styles.collections}>
        {collections.map(c => (
          <CollectionItem key={c._id} collection={c} />
        ))}
      </section>
    </Meta>
  );
};

export default Collections;
