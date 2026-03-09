import { createClient } from "@/utils/supabase/server";
import { getProducts } from "./actions";
import AddProductForm from "@/components/AddProductForm";
import ProductCard from "@/components/ProductCard";
import { TrendingDown, Shield, Bell, Rabbit } from "lucide-react";
import AuthButton from "@/components/AuthButton";
import StoreCarousel from "@/components/StoreCarousel";
import Image from "next/image";

const STORES = [
  { src: "/amazon-1.png", alt: "Amazon" },
  { src: "/flipkart-2.png", alt: "Flipkart" },
  { src: "/zara.png", alt: "Zara" },
  { src: "/walmart-1.png", alt: "Walmart" },
  { src: "/souled.png", alt: "Souled" },
  { src: "/meesho.png", alt: "Meesho" },
  { src: "/bestbuy.png", alt: "BestBuy" },
  { src: "/myntra.png", alt: "Myntra" },
];

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const products = user ? await getProducts() : [];

  const FEATURES = [
    {
      icon: Rabbit,
      title: "Lightning Fast",
      description:
        "Extracts prices in seconds, handling JavaScript and dynamic content",
    },
    {
      icon: Shield,
      title: "Always Reliable",
      description:
        "Works across all major e-commerce sites with built-in anti-bot protection",
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Get notified instantly when prices drop below your target",
    },
  ];

  return (
    <main className="min-h-screen bg-transparent">
      {/*<main className="min-h-screen bg-transparent">*/}
      {/*<header className="bg-transparent backdrop-blur-sm sticky top-0 z-10"></header>*/}
      {/* Header */}
      <header className="bg-transparent backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image
              src="/price-logo.png"
              alt="Deal Drop Logo"
              width={800}
              height={600}
              className="h-10 w-auto"
            />
          </div>

          <AuthButton user={user} />
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-pink-100 text-indigo-700 px-6 py-2 rounded-full text-sm font-medium mb-6">
            🔔 Real-Time Price Tracking
          </div>

          <h2 className="text-6xl font-extrabold text-indigo-900 mb-4 tracking-tight">
            Never Miss a Price Drop
          </h2>
          <p className="text-xl text-gray-800 mb-12 max-w-3xl mx-auto">
            Track prices from any e-commerce site. Get instant alerts when
            prices drop.<br/> Save money effortlessly.
          </p>

          <AddProductForm user={user} />

          {/* Features */}
          {products.length === 0 && (
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-16">
              {FEATURES.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Icon className="w-8 h-8 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
                  <p className="text-base text-gray-600">{description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Supported stores carousel */}
        {products.length === 0 && (
          <div className="mt-16">
            <h4 className="text-xl font-bold text-gray-900 mb-16 text-center">
              Supported Stores
            </h4>
            <StoreCarousel
              stores={STORES}
              duration={20}
              className="max-w-5xl mx-auto"
            />
          </div>
        )}
      </section>

      
      {/* Products Grid */}
      {user && products.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Your Tracked Products
            </h3>
            <span className="text-sm text-gray-500">
              {products.length} {products.length === 1 ? "product" : "products"}
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 items-start">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {user && products.length === 0 && (
        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12">
            <TrendingDown className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products yet
            </h3>
            <p className="text-gray-600">
              Add your first product above to start tracking prices!
            </p>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-purple-100 text-gray-600 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Price Pulse. All rights reserved.
          </p>
          <div className="space-x-4 mt-2 md:mt-0">
            <a href="#" className="text-sm hover:underline">
              Terms
            </a>
            <a href="#" className="text-sm hover:underline">
              Privacy
            </a>
            <a
              href="https://github.com/SamriddhoBiswas/PricePulse"
              className="text-sm hover:underline"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
