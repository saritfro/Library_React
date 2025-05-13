import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import LoanForm from "../Comp/Loans/LoanForm";    // ✅
import LoanList from "../Comp/Loans/LoanList";    // 
import LoanStats from "../Comp/Loans/LoanStats";  // 

export default function Loans() {
  const [loans, setLoans] = useState([]);
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
 
 
  


  const handleSubmit = (loanData) => {
    const newLoan = { id: Date.now(), ...loanData, status: "מושאל" };
    setLoans([...loans, newLoan]);

    const updatedBooks = books.map(book =>
      book.id === loanData.book_id ? { ...book, status: "מושאל" } : book
    );
    setBooks(updatedBooks);

    setShowForm(false);
  };

 

  return (
    <Layout>
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ניהול השאלות</h1>
          <p className="text-gray-500 mt-1">ניהול השאלות ספרים והחזרות</p>
        </div>
        
      </div>

      <LoanStats loans={loans} />

      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <LoanList 
          loans={loans}
          books={books}
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
    </Layout>
  );
}
