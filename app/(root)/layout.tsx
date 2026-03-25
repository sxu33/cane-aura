export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row min-h-screen">
      <main className="flex flex-1 wrapper">{children}</main>
    </div>
  );
}
