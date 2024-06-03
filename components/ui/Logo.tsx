'use client';
import Image from 'next/image';
import useAppConfig from '../../hooks/useAppConfig';

/**
 * Logo de l'application
 * @returns {JSX.Element} - Composant JSX
 */
export default function Logo(): JSX.Element {
  const config = useAppConfig();

  if (!config) return <div></div>;

  return (
    <Image
      src={config.theme.logo.src}
      alt="LearnyLib"
      width={config.theme.logo.width}
      height={config.theme.logo.height}
    />
  );
}
