"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <header className="w-full flex flex-col bg-white text-black dark:bg-black dark:text-white shadow sticky top-0 z-10">
      <div className="flex justify-between items-center h-[60px] px-4">
        <Image
          src="/logo.svg"
          alt="My Inventory logo"
          width={180}
          height={38}
          priority
        />
        {/* Hamburger menu for mobile */}
        <button
          className="sm:hidden flex flex-col justify-center items-center w-10 h-10"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="block w-6 h-0.5 light:bg-black dark:bg-white mb-1 transition-all" />
          <span className="block w-6 h-0.5 bg-black dark:bg-white mb-1 transition-all" />
          <span className="block w-6 h-0.5 bg-black dark:bg-white transition-all" />
        </button>
        {/* Desktop navigation */}
        <nav className="hidden sm:flex gap-8 items-center">
          <Link href="/" className="hover:underline text-black dark:text-white">
            Inicio
          </Link>
          <Link
            href="/inventario"
            className="hover:underline text-black dark:text-white"
          >
            Inventario
          </Link>
          <Link
            href="/contacto"
            className="hover:underline text-black dark:text-white"
          >
            Contacto
          </Link>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="ml-4 px-3 py-1 rounded bg-gray-200 dark:bg-gray-800 text-black dark:text-white border border-gray-400 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors w-32"
            aria-label="Cambiar tema"
            type="button"
          >
            {theme === "dark" ? "☀️ Claro" : "🌙 Oscuro"}
          </button>
        </nav>
      </div>
      {/* Mobile navigation dropdown */}
      {menuOpen && (
        <nav className="sm:hidden flex flex-col gap-4 px-4 pb-4 animate-fade-in bg-white dark:bg-black">
          <Link
            href="/"
            className="hover:underline text-black dark:text-white"
            onClick={() => setMenuOpen(false)}
          >
            Inicio
          </Link>
          <Link
            href="/inventario"
            className="hover:underline text-black dark:text-white"
            onClick={() => setMenuOpen(false)}
          >
            Inventario
          </Link>
          <Link
            href="/contacto"
            className="hover:underline text-black dark:text-white"
            onClick={() => setMenuOpen(false)}
          >
            Contacto
          </Link>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="mt-2 px-3 py-1 rounded bg-gray-200 dark:bg-gray-800 text-black dark:text-white border border-gray-400 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            aria-label="Cambiar tema"
            type="button"
          >
            {theme === "dark" ? "☀️ Claro" : "🌙 Oscuro"}
          </button>
        </nav>
      )}
    </header>
  );
}
