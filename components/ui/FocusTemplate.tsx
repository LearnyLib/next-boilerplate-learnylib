'use client';
import styles from '../../styles/learnylib.module.css';

interface FocusTemplateProps {
  children: React.ReactNode;
}

/**
 * Template épuré dont le contenu est affiché au centre de l'écran
 * @returns {JSX.Element} - Composant JSX
 */
export default function FocusTemplate({
  children,
}: FocusTemplateProps): JSX.Element {
  return (
    <main className={styles.focusMain}>
      <section className={styles.focusSection}>{children}</section>
    </main>
  );
}
