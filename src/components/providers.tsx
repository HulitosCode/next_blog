"use client";

import { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

interface ProvidersProps {
  children: ReactNode;
}

const queryClient = new QueryClient(); // Instanciando o QueryClient corretamente

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Providers;
