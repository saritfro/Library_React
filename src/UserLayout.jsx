import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "./components/Utils";
import {
  Library,
  ArrowUpFromLine,
  ArrowDownToLine,
  CornerDownLeft,
  Settings,
  Menu,
  X
} from "lucide-react";
import { Button } from "./components/ui/button";
import { cn } from "./lib/Utils";

export default function UserLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="flex h-screen bg-gray-100" dir="rtl">
      {/* רקע תפריט במובייל */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* סיידבר */}
      <aside style={{ backgroundColor: "rgb(225 134 131 / 45%)" }} className={cn(
        "fixed top-0 right-0 z-50 h-full w-64 bg-[#83B9E1] border-l transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
        sidebarOpen ? "translate-x-0" : "translate-x-full"  
      )}>
        <div>
          <img src="./images/logo.png" alt="לוגו" width="200" />
          <p style={{ color: "rgb(147 166 196)" }} className="text-xl font-bold">
            ניהול משתמש
          </p>
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
            to={createPageUrl("UserLoans")}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-red-50 rounded-lg"
            onClick={() => setSidebarOpen(false)}
          >
            <ArrowUpFromLine className="w-5 h-5" />

            השאלות
          </Link>
          <Link
            to={createPageUrl("UserReturn")}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-red-50 rounded-lg"
            onClick={() => setSidebarOpen(false)}
          >
            <ArrowDownToLine className="w-5 h-5" />
            החזרות
          </Link>
          
          <Link
            to={"/"}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-red-50 rounded-lg"
            onClick={() => setSidebarOpen(false)}
          >
            <CornerDownLeft className="w-5 h-5" />

            חזרה לעמוד ראשי
          </Link>
        </nav>
      </aside>

      {/* תוכן ראשי */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
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

        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
