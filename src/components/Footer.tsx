import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const categories = [
    { name: "Bedroom", href: "/bedroom" },
    { name: "Study Room", href: "/study-room" },
    { name: "Living Room", href: "/living-room" },
    { name: "Kitchen", href: "/kitchen" },
    { name: "Bathroom", href: "/bathroom" },
    { name: "Balcony", href: "/balcony" },
  ];

  return (
    <footer className="bg-neutral-50 border-t border-neutral-100 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & About */}
          <div className="flex flex-col gap-3">
            <span className="text-lg font-bold tracking-tight text-neutral-900">
              renters<span className="text-amber-600 font-light">decor</span>hub
            </span>
            <p className="text-sm text-neutral-500 leading-relaxed max-w-xs">
              Curated home decor inspiration and rental-friendly furnishing solutions for modern apartment living.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider">
              Explore Rooms
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-sm text-neutral-500">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <Link
                    to={cat.href}
                    className="hover:text-neutral-900 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Compliance Disclaimer */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider">
              Affiliate Disclosure
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              As an Amazon Associate, I earn from qualifying purchases. This means
              if you click on certain product links and make a purchase, I may
              receive a small commission at no additional cost to you.
            </p>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="mt-12 pt-8 border-t border-neutral-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-400">
            &copy; {currentYear} rentersdecorhub. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-neutral-400">
            <Link to="/" className="hover:text-neutral-600">
              Privacy Policy
            </Link>
            <Link to="/" className="hover:text-neutral-600">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
