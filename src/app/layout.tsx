export const metadata = {
  title: "Utens.app — AI Front Desk",
  description: "AI answers with human escalation by text.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body style={{ margin: 0 }}>{children}</body></html>;
}
