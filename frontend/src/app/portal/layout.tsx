import React from 'react';

export const metadata = {
  title: 'Portal Educativo | TrabajoDigno.co',
  description: 'Accede a recursos educativos sobre derechos laborales en Colombia',
};

export default function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
} 