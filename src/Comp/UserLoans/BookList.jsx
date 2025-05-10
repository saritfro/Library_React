
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Pencil } from "lucide-react";
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import axios from "axios";
import CheckBox from "./CheckBox"

export default function BookList({ books, onEdit, onDelete }) {
  const [overedBookId, setOveredBookId] = useState(false)
  return (
    <div className="overflow-x-auto ">
      <Table  className="w-full table-auto border border-gray-200 shadow-sm rounded-lg overflow-hidden">
  <TableHeader className=" text-white-700">
    <TableRow>
      <TableHead className="text-center w-12"></TableHead>
      <TableHead className="text-center">שם ספר</TableHead>
      <TableHead className="text-center">קטגוריה</TableHead>
      <TableHead className="text-center">סופר</TableHead>
      <TableHead className="text-center">הוצאה</TableHead>
      <TableHead className="text-center">עותקים</TableHead>
      <TableHead className="text-center">פרסום</TableHead>
    </TableRow>
  </TableHeader>

  <TableBody>
    {books.map((book, index) => (
      <TableRow
        key={book._id}
        className= "bg-w-50 h-20 hover:bg-gray-100 transition"
      >
          <TableCell className="font-heebo text-lg text-center">
          <CheckBox className="w-6 h-6" />
          </TableCell>

        <TableCell className="font-heebo text-lg text-center">{book.bookName}</TableCell>
        <TableCell className="font-heebo text-lg text-center">{book.category}</TableCell>
        <TableCell className="font-heebo text-lg text-center">{book.author}</TableCell>
        <TableCell className="font-heebo text-lg text-center">{book.publisher}</TableCell>
        <TableCell className="font-heebo text-lg text-center">{book.copiesNum}</TableCell>
        <TableCell className="font-heebo text-lg text-center">{new Date(book.publishingDate).toLocaleDateString()}</TableCell>
    
      </TableRow>
    ))}
    {books.length === 0 && (
      <TableRow>
        <TableCell colSpan={8} className="text-center py-8 text-gray-500">
          לא נמצאו ספרים
        </TableCell>
      </TableRow>
    )}
  </TableBody>
</Table>

    </div>
  );
}
