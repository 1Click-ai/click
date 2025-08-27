import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'API Keys | КЛИК',
  description: 'Manage your API keys for programmatic access to КЛИК',
  openGraph: {
    title: 'API Keys | КЛИК',
    description: 'Manage your API keys for programmatic access to КЛИК',
    type: 'website',
  },
};

export default async function APIKeysLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
