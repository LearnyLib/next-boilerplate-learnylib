'use client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Toast from './Toast';
import LightModeType from '../../types/LightModeType';
import AppConfigType from '../../types/AppConfigType';
import useLightModeStore from '../../store/useLightModeStore';
import { useEffect, useState } from 'react';
import useAppConfigStore from '../../store/useAppConfigStore';
import { useLearnyLibTheme } from '../../theme/useLearnyLibTheme';

interface TemplateProviderProps {
  children: React.ReactNode;
  lightMode: LightModeType;
  config: AppConfigType;
}

export default function TemplateProvider({
  children,
  lightMode,
  config,
}: TemplateProviderProps) {
  const theme = useLearnyLibTheme(config, lightMode);

  const { setLightMode } = useLightModeStore();

  const { setConfig } = useAppConfigStore();

  const [client] = useState(new QueryClient());

  useEffect(() => {
    setLightMode(lightMode);

    setConfig(config);
  }, [lightMode, setLightMode, config, setConfig]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={client}>
        <ReactQueryStreamedHydration>
          <div>{children}</div>
        </ReactQueryStreamedHydration>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <Toast />
    </ThemeProvider>
  );
}
