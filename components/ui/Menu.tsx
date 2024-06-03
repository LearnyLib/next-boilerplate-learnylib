'use client';
import useMenuStore from '../../store/useMenuStore';
import styles from '../../styles/learnylib.module.css';
import MenuGroup from './MenuGroup';

/**
 * Menu de l'application composé de groupes, options et sous-options
 * @returns {JSX.Element} - Composant JSX
 */
export default function Menu(): JSX.Element {
  const { menu } = useMenuStore();

  return (
    <div className={styles.menu}>
      {menu
        .filter((group) => !group.hide)
        .map((group, index) => (
          <MenuGroup group={group} key={index} />
        ))}
    </div>
  );
}
