
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Pencil } from "lucide-react";
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import axios from "axios";

export default function BookList({ books, onEdit,onDelete }) {
  const Delete=()=>{
    axios.Delete("http://localhost:8080/books/deleteBook/")
  }
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>שם ספר</TableHead>
            <TableHead>קטגוריה</TableHead>
            <TableHead>סופר</TableHead>
            <TableHead>הוצאה</TableHead>
            <TableHead>מספר עותקים</TableHead>
            <TableHead>תאריך פרסום</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book._id}>
                  <DeleteOutlinedIcon onClick={()=>{onDelete(book)}}/>

              <TableCell className="font-medium">{book.bookName}</TableCell>
              <TableCell>{book.category}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.publisher}</TableCell>
              <TableCell>{book.copiesNum}</TableCell>
              <TableCell>{new Date(book.publishingDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(book)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(book)}
                >

                </Button>
              </TableCell>
            </TableRow>
          ))}
          {books.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                לא נמצאו ספרים
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
