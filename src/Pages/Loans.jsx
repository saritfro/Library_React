import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from '../components/ui/button';
import LoanForm from "../Comp/Loans/LoanForm";    // ✅
import LoanList from "../Comp/Loans/LoanList";    // 
import LoanStats from "../Comp/Loans/LoanStats";  // 
// import bookList from "../entities/BookList.json";

export default function Loans() {
  const [loans, setLoans] = useState([]);
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
 
  // useEffect(() => {
  //   loadData();
  // }, []);

  // const loadData = () => {
  //   setLoans(loanList);
  //   setBooks(bookList);
  // };
  


  const handleSubmit = (loanData) => {
    const newLoan = { id: Date.now(), ...loanData, status: "מושאל" };
    setLoans([...loans, newLoan]);

    const updatedBooks = books.map(book =>
      book.id === loanData.book_id ? { ...book, status: "מושאל" } : book
    );
    setBooks(updatedBooks);

    setShowForm(false);
  };

  // const handleReturn = (loan) => {
  //   const updatedLoans = loans.map(l =>
  //     l.id === loan.id ? { ...l, status: "הוחזר", return_date: new Date().toISOString().split('T')[0] } : l
  //   );
  //   setLoans(updatedLoans);

  //   const updatedBooks = books.map(book =>
  //     book.id === loan.book_id ? { ...book, status: "זמין" } : book
  //   );
  //   setBooks(updatedBooks);
  // };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ניהול השאלות</h1>
          <p className="text-gray-500 mt-1">ניהול השאלות ספרים והחזרות</p>
        </div>
        {/* <Button 
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700"
          disabled={!books.some(book => book.status === "זמין")}
        >
          <Plus className="w-5 h-5 ml-2" />
          השאלה חדשה
        </Button> */}
      </div>

      <LoanStats loans={loans} />

      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <LoanList 
          loans={loans}
          books={books}
          // onReturn={handleReturn}
        />
      </div>

      {showForm && (
        <LoanForm
          books={books.filter(book => book.status === "זמין")}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
