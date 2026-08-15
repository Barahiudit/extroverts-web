"use client";

import { Home, MessageCircle, Plus, User } from "lucide-react";

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 py-4 max-w-md mx-auto">
      <div className="flex items-center justify-around">
        <button aria-label="Home">
          <Home className="w-6 h-6 text-white" strokeWidth={1.5} />
        </button>
        <button aria-label="Chat">
          <MessageCircle className="w-6 h-6 text-white" strokeWidth={1.5} />
        </button>
        <button aria-label="Add">
          <Plus className="w-6 h-6 text-white" strokeWidth={1.5} />
        </button>
        <button aria-label="Profile">
          <User className="w-6 h-6 text-white" strokeWidth={1.5} />
        </button>
      </div>
    </nav>
  );
}