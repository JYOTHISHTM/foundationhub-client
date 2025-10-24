"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation */}
      <nav className="px-6 py-4 border-b border-gray-100">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="text-gray-900 text-lg font-semibold">Welcome</div>
          <button
            onClick={() => router.push("/auth/login")}
            className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors duration-200"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Welcome Message */}
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-tight">
            Welcome
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg text-gray-600 mb-12 leading-relaxed font-light">
            A simple, elegant space designed for you.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => router.push("/auth/login")}
            className="inline-flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-md text-sm font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          >
            Get Started
          </button>
          <button
            onClick={() => router.push("/home")}
            className="inline-flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-md text-sm font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          >
            home
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-gray-100">
        <div className="max-w-4xl mx-auto flex justify-center">
          <p className="text-xs text-gray-400">
            © 2025 Welcome App. Made with care.
          </p>
        </div>
      </footer>
    </div>
  );
}