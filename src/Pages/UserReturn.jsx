import React, { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import BookFilters from "../Comp/UserLoans/BookFilters";
import BookList from "../Comp/UserReturns/BookList";
import { Plus, Search } from "lucide-react";
import axios from "axios";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { Card, CardContent } from "../components/ui/card";
import CurReturns from "../Comp/UserReturns/CurReturns"
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Item } from "@radix-ui/react-select";

export default function UserReturn() {
  console.log("UserReturn")
  const toast = useRef(null);
 const [checkedLoans,setCheckedLoans]=useState([])

  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: "הכל",
    status: "הכל",
    searchTerm: ""
  });

  useEffect(() => {
    axios.get("http://localhost:8080/users/getUser/1")//זמני👌👌👌👌
      .then((response) => {
        setBooks(response.data.curBorrowedbooks);
        setLoading(false);
        console.log("books"+books)
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [checkedLoans]);

  
  const filteredBooks = books.filter((book) => {
    const categoryMatch = filters.category === "הכל" || book.category === filters.category;
    const statusMatch = filters.status === "הכל" || book.status === filters.status;
    const searchMatch =
      (book.bookName?.toLowerCase().includes(filters.searchTerm.toLowerCase()) || "") ||
      (book.publisher?.toLowerCase().includes(filters.searchTerm.toLowerCase()) || "");
    return categoryMatch && statusMatch && searchMatch;
  });



const handleChecked = (book) => {
  setCheckedLoans(prev => {
    if (prev.find(Item=>Item==book)) return prev;
    return [...prev, book];
  });
};
/**
 * TODO: Replace usage of bookName with bookId when every item has a unique ID.
 * Handles deletion of a book from the checked loans list.
 * 
 * @param {string} id - The book's ID to remove.
 */
const handleDelete = (id) => {
  setCheckedLoans(prev => prev.filter(item => item.bookName !== id));
};
 const fielsDict = {
    bookId: "מזהה ספר",
    bookName: "שם ספר",
    publishingDate: "תאריך הו'ל",
    publisher: "מו'ל",
    author: "סופר",
    lendingDate: "תאריך השאלה נוכחית",
    copyNumber: "מס' עותק",
    category: "קטגוריה",
    status: "סטטוס",
    Lender: "משאיל"
  };
  return (

<div className="flex flex-row-reverse ">{console.log("dashbourd2")}
   <div className="w-1/4 mr-10" >

<CurReturns  setCheckedLoans={setCheckedLoans} checkedLoans={checkedLoans} handleDelete={handleDelete} />
   </div>
   <div className="w-3/4" >

      {/* מסננים + חיפוש */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              placeholder="חיפוש לפי כותר או מחבר..."
              className="pr-10"
              value={filters.searchTerm}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, searchTerm: e.target.value }))
              }
            />
          </div>
          <BookFilters filters={filters} setFilters={setFilters} />
        </div>
       
        <BookList books={filteredBooks} handleChecked={handleChecked} setCheckedLoans={setCheckedLoans} checkedLoans={checkedLoans} handleDelete={handleDelete} />
    
      </div>

      </div>
      </div>

  );
}
