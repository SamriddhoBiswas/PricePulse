import "./globals.css";

export const metadata = {
  title: "Price Tracker - Never Miss a Price Drop",
  description: "Track product prices across e-commerce sites and get alerts on price drops",
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
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
