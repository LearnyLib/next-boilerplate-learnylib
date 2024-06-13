import styles from '../../styles/learnylib.module.css';
import Logo from './Logo';
import NavToggleButton from './NavToggleButton';

/**
 * Haut du composant Nav
 * @returns {JSX.Element}
 */
export default function NavTop(): JSX.Element {
  return (
    <div className={styles.navTop}>
      <div>
        <Logo />
      </div>
      <NavToggleButton />
    </div>
  );
}
