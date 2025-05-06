import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "./components/Utils";
import { Library, BookOpen, Users, Settings, Menu, X } from "lucide-react";
import { Button } from "./components/ui/button";
import { cn } from "./lib/Utils";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="flex h-screen bg-gray-100" dir="rtl">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 right-0 z-50 h-full w-64 bg-[#83B9E1] border-l transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
        sidebarOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div >
        {/* className="flex items-center justify-between p-4" */}
           <img src='./logo.png'alt="לוגו" width="200" />
          <h1 className="text-xl font-bold  ">
         
            {/* <Library className="w-6 h-6 text-blue-600" /> */}
            ניהול ספרייה
          </h1>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="px-4 py-2">
          <Link
            to={createPageUrl("Dashboard")}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
            onClick={() => setSidebarOpen(false)}
          >
            <BookOpen className="w-5 h-5" />
            ספרים
          </Link>
          <Link
            to={createPageUrl("Loans")}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
            onClick={() => setSidebarOpen(false)}
          >
            <Users className="w-5 h-5" />
            השאלות
          </Link>
          <Link
            to={createPageUrl("Settings")}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
            onClick={() => setSidebarOpen(false)}
          >
            <Settings className="w-5 h-5" />
            הגדרות
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Mobile header */}
        <header className="md:hidden bg-white border-b px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
}