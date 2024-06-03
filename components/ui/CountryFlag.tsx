'use client';
import Image from 'next/image';

interface CountryFlagProps {
  code: string;
}

const width = 24;

const height = 18;

/**
 * Image PNG du drapeau correspondant au code du pays envoyé en propriété
 * @returns {JSX.Element} - Composant JSX
 */
export default function CountryFlag({ code }: CountryFlagProps): JSX.Element {
  return (
    <Image
      src={`https://flagcdn.com/${width}x${height}/${code.toLowerCase()}.png`}
      alt={code}
      width={width}
      height={height}
    />
  );
}
