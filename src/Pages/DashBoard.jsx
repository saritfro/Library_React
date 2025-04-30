import React, { useState,useEffect } from "react";
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import BookFilters from '../Comp/Books/BookFilters';
import BookForm from '../Comp/Books/BookForm';
import BookList from '../Comp/Books/BookList';
import { Plus, Search } from 'lucide-react';
import axios from 'axios';
import { FileUpload } from 'primereact/fileupload';
import 'primereact/resources/themes/lara-light-blue/theme.css'; // או נושא אחר
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default function Dashboard() {
  const [books, setBooks] = useState([]); // מתחיל ריק
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
    // Make GET request to fetch data
    axios.get("http://localhost:8080/books/getAllBooks")
        .then((response) => {
            setBooks(response.data);
            setLoading(false);
        })
        .catch((err) => {
            setError(err.message);
            setLoading(false);
        });
}, []);
  
  const handleSubmit = async (bookData) => {
    try {
      if (editingBook) {
        const res = await axios.put(`http://localhost:8080/books/putBook/${editingBook.bookId}`, bookData);
        // const updatedBooks = books.map(book => book.bookId === editingBook.bookId ? res.data : book);
        const updatedBooks = books.map(book => book.bookId === editingBook.bookId ? res.data : book);
        setBooks(updatedBooks);
      } else {
        const res = await axios.put("http://localhost:8080/books/postBook",  { id: Date.now(), ...bookData });
        setBooks([...books, res.data]);
      }
    } catch (error) {
      console.error("שגיאה בשמירה לשרת:", error);
    }

   
    setShowForm(false);
    setEditingBook(null);
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const filteredBooks = books.filter(book => {
    const categoryMatch = filters.category === "הכל" || book.category === filters.category;
    const statusMatch = filters.status === "הכל" || book.status === filters.status;
   const searchMatch =
  (book.bookName?.toLowerCase().includes(filters.searchTerm.toLowerCase()) || "") ||
  (book.publisher?.toLowerCase().includes(filters.searchTerm.toLowerCase()) || "");
    return categoryMatch && statusMatch && searchMatch;
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ניהול ספרים</h1>
          <p className="text-gray-500 mt-1">ניהול מלאי הספרים בספרייה</p>
        </div>
  
        
      </div>
      

        <div className="card"> \\לסדר מיקום 
          <Button style={{marginTop:"20px"}} onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-5 h-5 ml-2" />
          הוספת ספר חדש
        </Button>
        
            <FileUpload name="demo[]" url={'/api/upload'} multiple accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
        </div>
  
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              placeholder="חיפוש לפי כותר או מחבר..."
              className="pr-10"
              value={filters.searchTerm}
              onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
            />
          </div>
          <BookFilters filters={filters} setFilters={setFilters} />
        </div>

        <BookList books={filteredBooks} onEdit={handleEdit} />
      </div>

      {showForm && (
        <BookForm
          book={editingBook}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingBook(null);
          }}
        />
      )}
    </div>
  );
}
