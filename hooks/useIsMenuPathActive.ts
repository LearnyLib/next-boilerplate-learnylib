'use client';
import { usePathname } from 'next/navigation';
import useMenuStore from '../store/useMenuStore';
import { useCallback, useMemo } from 'react';

type isPathActiveFn = (path: string) => boolean;

/**
 * Hook qui permet de vérifier si un chemin du menu est actif
 * @returns {isPathActiveFn}
 */
export default function useIsMenuPathActive(): isPathActiveFn {
  const { menu } = useMenuStore();

  const pathname = usePathname();

  const pathsSortedByLengthDesc: string[] = useMemo(() => {
    let paths: string[] = [];

    menu.forEach((group) => {
      group.options.forEach((option) => {
        paths.push(option.path);

        option.subOptions?.forEach((subOption) => {
          paths.push(subOption.path);
        });
      });
    });

    return paths.sort((a, b) => b.length - a.length);
  }, [menu]);

  const isPathActive = useCallback(
    (path: string) => {
      const pathActive = pathsSortedByLengthDesc.find((p) => p === pathname);

      return pathActive === path;
    },
    [pathname, pathsSortedByLengthDesc],
  );

  return isPathActive;
}
