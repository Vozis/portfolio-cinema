import { IMenu } from '@/layout/menu-container/menu-item/menu-item.interface';

export const firstMenu: IMenu = {
  title: 'Меню',
  items: [
    {
      icon: 'MdHome',
      link: '/',
      title: 'Главная',
    },
    {
      icon: 'MdExplore',
      link: '/genres',
      title: 'Коллекции',
    },
    {
      icon: 'MdRefresh',
      link: '/fresh',
      title: 'Новинки',
    },
    {
      icon: 'MdLocalFireDepartment',
      link: '/trending',
      title: 'Популярное',
    },
  ],
};

export const userMenu: IMenu = {
  title: 'Основные',
  items: [],
};
