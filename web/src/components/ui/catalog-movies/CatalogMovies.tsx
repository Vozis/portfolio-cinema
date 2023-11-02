import { FC } from 'react';

import { ICatalog } from '@/ui/catalog-movies/catalog.interface';
import GalleryItem from '@/ui/gallery/GalleryItem';
import Description from '@/ui/heading/Description';
import Heading from '@/ui/heading/Heading';

import { getMovieUrl } from '@/config/api/url.config';

import Meta from '@/utils/meta/Meta';

import styles from './CatalogMovies.module.scss';

const CatalogMovies: FC<ICatalog> = ({ movies, title, description }) => {
  // console.log(movies);

  return (
    <Meta title={title} description={description}>
      <Heading title={title} className={styles.heading} />

      {description && (
        <Description text={description} className={styles.description} />
      )}

      <section className={styles.movies}>
        {movies.map(movie => (
          <GalleryItem
            key={movie.id}
            item={{
              name: movie.title,
              link: getMovieUrl(movie.slug),
              posterPath: movie.bigPosters[0].url,
              content: {
                title: movie.title,
              },
            }}
            variant={'horizontal'}
          />
        ))}
      </section>
    </Meta>
  );
};

export default CatalogMovies;
