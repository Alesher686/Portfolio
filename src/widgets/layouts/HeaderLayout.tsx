import { useEffect, useRef } from 'react';
import logo from '@/shared/assets/img/logo_sw.png';
import s from './headerLayout.module.scss';

const HeaderLayout = () => {
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        if (window.scrollY > 0) {
          headerRef.current?.classList.add(s.scrolled);
        } else {
          headerRef.current.classList.remove(s.scrolled);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={headerRef} className={s.headerWrapper}>
      <div className={s.logoWrapper}>
        <img src={logo} className={s.avatarStyle} alt="logo" />
        <div className={s.hiddenStyle}></div>
      </div>
    </div>
  );
};

export default HeaderLayout;
