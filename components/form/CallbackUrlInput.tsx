'use client';
import { useSearchParams } from 'next/navigation';

/**
 * Input masqué dans lequel est stockée l'URL où l'utilisateur sera redirigé après l'authentification
 * L'URL provient du paramètre de recherche "callbackUrl" de l'URL
 * S'il n'est pas présent, on utilise la valeur de defaultAuthCallbackUrl de la configuration
 * @returns {JSX.Element} - Composant JSX
 */
export default function CallbackUrlInput(): JSX.Element {
  const searchParams = useSearchParams();

  return (
    <input
      name="callbackUrl"
      type="hidden"
      value={searchParams.get('callbackUrl') || '/'}
    />
  );
}
