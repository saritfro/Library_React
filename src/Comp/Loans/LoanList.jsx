import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';

import { format } from "date-fns";
import { ArrowLeftRight } from "lucide-react";

const statusColors = {
  "פעיל": "bg-blue-100 text-blue-800",
  "הוחזר": "bg-green-100 text-green-800",
  "באיחור": "bg-red-100 text-red-800"
};

export default function LoanList({ loans, books, onReturn }) {
  const getBookTitle = (bookId) => {
    const book = books.find(b => b.id === bookId);
    return book ? book.title : 'ספר לא נמצא';
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() ? "באיחור" : "פעיל";
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>שם הספר</TableHead>
          <TableHead>שם השואל</TableHead>
          <TableHead>תאריך השאלה</TableHead>
          <TableHead>תאריך החזרה</TableHead>
          <TableHead>סטטוס</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loans.map((loan) => (
          <TableRow key={loan.id}>
            <TableCell className="font-medium">
              {getBookTitle(loan.book_id)}
            </TableCell>
            <TableCell>{loan.borrower_name}</TableCell>
            <TableCell>{format(new Date(loan.loan_date), "dd/MM/yyyy")}</TableCell>
            <TableCell>{format(new Date(loan.due_date), "dd/MM/yyyy")}</TableCell>
            <TableCell>
              <Badge className={statusColors[loan.status || isOverdue(loan.due_date)]}>
                {loan.status || isOverdue(loan.due_date)}
              </Badge>
            </TableCell>
            <TableCell>
              {loan.status !== "הוחזר" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onReturn(loan)}
                  className="flex items-center gap-2"
                >
                  <ArrowLeftRight className="h-4 w-4" />
                  החזרה
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
        {loans.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-8 text-gray-500">
              לא נמצאו השאלות
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}