import { NextPage } from 'next';

import ErrorPage from '@/pages/404';
import Collections from '@/screens/collection/Collections';
import { ICollection } from '@/screens/collection/collection.interface';
import { GenreService } from '@/services/genre.service';

const GenresPage: NextPage<{ collections: ICollection[] }> = ({
  collections,
}) => {
  return collections ? (
    <Collections collections={collections || []} />
  ) : (
    <ErrorPage />
  );
};

export default GenresPage;

export const getStaticProps = async () => {
  try {
    const { data: collections } = await GenreService.getCollection();

    const checkedCollections = collections.filter(
      collection => collection.image,
    );

    return {
      props: { collections: checkedCollections },
      revalidate: 10,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
