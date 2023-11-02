import { NextPage } from 'next';
import Meta from '@/utils/meta/Meta';
import Heading from '@/ui/heading/Heading';

const ErrorPage: NextPage = () => {
  return (
    <Meta title={'Page not found'}>
      <Heading title={'404-page not found'} />
    </Meta>
  );
};

export default ErrorPage;
