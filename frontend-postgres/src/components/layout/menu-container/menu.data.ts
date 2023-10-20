import { IMenu } from '@/layout/menu-container/menu-item/menu-item.interface';

export const firstMenu: IMenu = {
  title: 'Menu',
  items: [
    {
      icon: 'MdHome',
      link: '/',
      title: 'Home',
    },
    {
      icon: 'MdExplore',
      link: '/genres',
      title: 'Discovery',
    },
    {
      icon: 'MdRefresh',
      link: '/fresh',
      title: 'fresh movies',
    },
    {
      icon: 'MdLocalFireDepartment',
      link: '/trending',
      title: 'Trending now',
    },
  ],
};

export const userMenu: IMenu = {
  title: 'General',
  items: [],
};
