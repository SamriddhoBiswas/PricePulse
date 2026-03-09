import "./globals.css";

export const metadata = {
  title: "Price Pulse - Alerts For Price Drop",
  description: "Track product prices across e-commerce sites and get alerts on price drops",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* load Bricolage Grotesque from CDN before the page renders */}
        <link
          rel="stylesheet"
          href="https://fonts.cdnfonts.com/css/bricolage-grotesque"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
