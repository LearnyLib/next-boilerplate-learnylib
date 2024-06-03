'use client';
import Nav from './Nav';
import useTemplateStore from '../../store/useTemplateStore';
import { useEffect, useState } from 'react';
import NavToggleButton from './NavToggleButton';
import MenuType from '../../types/MenuType';
import styles from '../../styles/learnylib.module.css';
import useMenuStore from '../../store/useMenuStore';

interface MenuTemplateProps {
  children: React.ReactNode;
  menu: MenuType;
}

interface ShowState {
  nav: boolean;
  navButton: boolean;
  main: boolean;
}

/**
 * Template qui se présente sous la forme d'un dashboard avec une
 * bare latérale de navigation contenant les différents menus
 * Ce template ne devrait être utilisé que quand l'utilisateur est connecté
 * @returns {JSX.Element} - Composant JSX
 */
export default function MenuTemplate({
  children,
  menu,
}: MenuTemplateProps): JSX.Element {
  const { isSmallScreen, showSmallScreenNav, setIsSmallScreen } =
    useTemplateStore();

  const { setMenu } = useMenuStore();

  const [show, setShow] = useState<ShowState>({
    nav: false,
    navButton: false,
    main: false,
  });

  // Ajout de l'event listener pour prendre en compte le changement de taille de l'écran
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 800);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setIsSmallScreen]);

  // Gestion de l'affichage en fonction de la taille de l'écran et de l'affichage du Nav
  useEffect(() => {
    setShow({
      nav: !isSmallScreen || showSmallScreenNav,
      navButton: isSmallScreen,
      main: !isSmallScreen || !showSmallScreenNav,
    });
  }, [isSmallScreen, showSmallScreenNav]);

  // Sauvegarde du menu dans le store
  useEffect(() => {
    setMenu(menu);
  }, [menu, setMenu]);

  return (
    <>
      {show.nav && <Nav />}

      {show.navButton && <NavToggleButton />}

      {show.main && (
        <main className={styles.main}>
          <section className={styles.section}>{children}</section>
        </main>
      )}
    </>
  );
}
