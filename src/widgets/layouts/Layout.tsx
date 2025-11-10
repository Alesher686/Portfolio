import CollapsibleDock from '@/shared/ui/dock/CollapsibleDock.tsx';
import Footer from '@/widgets/footer/Footer.tsx';
import HeaderLayout from '@/widgets/layouts/HeaderLayout.tsx';
import { Outlet } from 'react-router-dom';

import s from './layout.module.scss';


export type DockItemData = {
  icon: React.ReactNode;
  label: React.ReactNode;
  onClick?: () => void;
  className?: string;
  scrollTo?: string;
  smooth?: boolean;
  duration?: number;
  offset?: number;
};

const items = [
  {
    icon: <span>🛠️</span>,
    label: 'Главная',
    scrollTo: 'home',
    smooth: true,
    duration: 500,
    offset: -125,
  },
  {
    icon: <span>🛠️</span>,
    label: 'Навыки',
    scrollTo: 'introduction',
    smooth: true,
    duration: 500,
    offset: -50,
  },
  {
    icon: <span>📋</span>,
    label: 'Проекты',
    scrollTo: 'experience',
    smooth: true,
    duration: 500,
    offset: -50,
  },
  {
    icon: <span>📞</span>,
    label: 'Контакты',
    scrollTo: 'skills',
    smooth: true,
    duration: 500,
    offset: 150,
  },
];

export const Layout = () => {
  return (
    <div className={s.layoutWrapper}>
      <HeaderLayout />
      <Outlet />
      <Footer />
      <CollapsibleDock
        items={items}
        position={{ bottom: 20, right: 20 }}
        toggleIcon={<span>🚀</span>}
        direction="left"
        openOnClick={false}
      />
    </div>
  );
};
