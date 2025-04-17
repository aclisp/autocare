import { FooterLinks } from '@/components/FooterLinks/FooterLinks';
import { HeaderMegaMenu } from '@/components/HeaderMegaMenu/HeaderMegaMenu';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderMegaMenu />
      {children}
      <FooterLinks />
    </>
  );
}
