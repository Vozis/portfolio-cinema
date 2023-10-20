import { FC } from 'react';

const NotAuthFavorites: FC = () => {
  return (
    <div
      className={
        'bg-gray-700 mt-11 bg-opacity-20 py-3 px-5 rounded-lg text-white text-opacity-80'
      }
    >
      For viewing your favorites, you must be logged in.
    </div>
  );
};

export default NotAuthFavorites;
