import { useState } from 'react';

import { QUICK_LINKS, SKILLS, SOCIAL_LINKS } from '@/shared/constants/footerInfo.tsx';

import s from './footer.module.scss';

const Footer = () => {
  const [currentYear] = useState(new Date().getFullYear());

  return (
    <div className={s.footerWrapper}>
      <div className={s.footerContent}>
        <div className={s.footerMain}>
          <div className={s.footerSection}>
            <h3 className={s.sectionTitle}>Разработчик</h3>
            <p className={s.description}>
              Frontend разработчик, специализирующийся на создании современных веб-приложений с
              использованием React, TypeScript и Node.js
            </p>
            <div className={s.socialLinks}>
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={s.socialLink}
                  title={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          <div className={s.footerSection}>
            <h3 className={s.sectionTitle}>Навигация</h3>
            <ul className={s.quickLinks}>
              {QUICK_LINKS.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className={s.quickLink}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className={s.footerSection}>
            <h3 className={s.sectionTitle}>Технологии</h3>
            <div className={s.skillTags}>
              {SKILLS.map((skill) => (
                <span key={skill} className={s.skillTag}>
                  {skill}
                </span>
              ))}
            </div>

            <p className={s.description}>подробнее...</p>
          </div>
          <div className={s.footerSection}>
            <h3 className={s.sectionTitle}>Связаться</h3>
            <div className={s.contactInfo}>
              <p className={s.contactItem}>
                <span className={s.contactIcon}>📧</span>
                alesher696.@gmail.com
              </p>
              <p className={s.contactItem}>
                <span className={s.contactIcon}>📱</span>
                +7 (981) 708-62-65
              </p>
              <p className={s.contactItem}>
                <span className={s.contactIcon}>📍</span>
                Saint-Petersburg, Russia
              </p>
            </div>
          </div>
        </div>
        <div className={s.footerBottom}>
          <div className={s.copyright}>
            <p>© {currentYear} Alexandr. all right's are reserved.</p>
          </div>
          <div className={s.footerMeta}>
            <span className={s.metaItem}>version 2.0</span>
          </div>
        </div>
      </div>
      <div className={s.footerDecor}>
        <div className={s.decorLine}></div>
      </div>
    </div>
  );
};

export default Footer;
