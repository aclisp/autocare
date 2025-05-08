import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/dates/styles.css';

import React from 'react';
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { theme } from '../theme';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Golden Sands Auto Care',
  description: 'TODO',
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=yes"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <ModalsProvider>
            <Notifications />
            {children}
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
