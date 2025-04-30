import React from "react";
import { Book, Users, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent } from '../../components/ui/card';

export default function LoanStats({ loans }) {
  const totalLoans = loans.length;
  const activeLoans = loans.filter(loan => loan.status === "פעיל").length;
  const overdueLoans = loans.filter(loan => 
    loan.status !== "הוחזר" && new Date(loan.due_date) < new Date()
  ).length;
  const uniqueBorrowers = new Set(loans.map(loan => loan.borrower_id)).size;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Book className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">סה״כ השאלות</p>
              <p className="text-2xl font-bold">{totalLoans}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">השאלות פעילות</p>
              <p className="text-2xl font-bold">{activeLoans}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">באיחור</p>
              <p className="text-2xl font-bold">{overdueLoans}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">שואלים שונים</p>
              <p className="text-2xl font-bold">{uniqueBorrowers}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}