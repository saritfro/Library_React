
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Pencil } from "lucide-react";
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import axios from "axios";
import CheckBox from "./CheckBox"
import React, { useState, useEffect } from "react";
import { useMyContext } from "../../myContext.jsx";

// import "../../CSS/CheckBox.css";  

export default function BookList({ books, handleChecked, setCheckedLoans, checkedLoans, handleDelete }) {
  const { fieldsDict } = useMyContext();
  console.log("fieldsDict", fieldsDict)
  const [overedBookId, setOveredBookId] = useState(false)
  console.log("BookList" + books)
  const [fields, setfields] = useState([])
  const [Hebrewfields, setHebrewfields] = useState([])

 useEffect(() => {
  const fetchFields = async () => {
    try {
      const res = await axios.get("http://localhost:8080/settings/getSettings");
      if (res.data.choosedFields) {
        const filteredFields = res.data.choosedFields.filter(f => f !== "Lender");
        setfields(filteredFields);
        setHebrewfields(filteredFields.map(i => i in fieldsDict ? fieldsDict[i] : i));
      }
    } catch (e) {
      console.log(e);
    }
  };

  fetchFields();
}, []);

 console.log(fields, "fields")

  return (
    <div className="overflow-x-auto ">
      <Table className="w-full table-auto border border-gray-200 shadow-sm rounded-lg overflow-hidden">
        <TableHeader className=" text-white-700">
          <TableRow>
            <TableHead className="text-center w-12"></TableHead>
            {Hebrewfields.map(i =>  <TableHead key={i} className="text-center">{i}</TableHead>
            )}
            {/* <TableHead className="text-center w-12"></TableHead> */}
          </TableRow>
        </TableHeader>

        <TableBody>
          {console.log("books" + books)}
          {books.map((book, index) => (

            <TableRow
              key={book._id}
              className="bg-w-50 h-20 hover:bg-gray-100 transition"
            >
              {console.log(book)}
              <TableCell className="font-heebo text-lg text-center">
                <input type="Checkbox"
                  className={`w-6 h-6 `}
                  // ${!bookChecked ? "invalid-checkbox" : ""}`
                  // }
                  onChange={(e) => {
                    if (e.target.checked) // האם סומן?
                      handleChecked(book);
                    else {
                      debugger;
                      handleDelete(book.bookName);
                    }
                  }} />
              </TableCell>


              {fields.map(field => (
                <TableCell className="font-heebo text-lg text-center" key={field}>
                  {
                    field === "publishingDate" && book[field]
                      ? new Date(book[field]).toLocaleDateString()
                        : book[field]
                  }
                </TableCell>
              ))}
              {/* <TableCell className="font-heebo text-lg text-center">{new Date(book.publishingDate).toLocaleDateString()}</TableCell> */}

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
