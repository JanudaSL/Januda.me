const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kjanuda.netlify.app/";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}