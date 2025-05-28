//להוסיף אקצס שיקבל את כל השדות ועליו לעשות מפ וליצור tablecell
import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Pencil } from "lucide-react";
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import axios from "axios";
import { useMyContext } from "../../myContext.jsx";


export default function BookList({ books, onEdit, onDelete }) {
  const [overedBookId, setOveredBookId] = useState(false)
  const [fields, setfields] = useState([])

  const { fieldsDict } = useMyContext();
  const [Hebrewfields, setHebrewfields] = useState([])

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const res = await axios.get("http://localhost:8080/settings/getSettings");
        setfields(res.data.choosedFields ? res.data.choosedFields : "")
        setHebrewfields(res.data.choosedFields.map(i => i in fieldsDict ? fieldsDict[i] : i))
        console.log(fields)
      } catch (e) {
        console.log(e);
      }
    };

    fetchFields();
  }, []);
  return (
    <div className="overflow-x-auto ">
      <Table className="w-full table-auto border border-gray-200 shadow-sm rounded-lg overflow-hidden">
        <TableHeader className=" text-white-700">
          <TableRow>
            <TableHead className="text-center w-12"></TableHead>
            {Hebrewfields.map(i => <TableHead className="text-center">{i}</TableHead>)}
            <TableHead className="text-center w-20"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {books.map((book) => (
            <TableRow
              key={book._id}
              className="bg-w-50 h-20 hover:bg-gray-100 transition"
            >
              <TableCell className="relative group flex  justify-center items-center min-h-[60px]">
                {/* DeleteOutlinedIcon יהיה מוסתר בזמן hover */}
                <DeleteOutlinedIcon
                  className="text-[gray] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  group-hover:hidden cursor-pointer "
                  onClick={() => onDelete(book)}
                />

                {/* DeleteIcon יהיה מוצג בזמן hover */}
                <DeleteIcon

                  className="text-[gray] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 !hidden group-hover:!block cursor-pointer"
                  onClick={() => onDelete(book)}
                />
              </TableCell>

              {fields.map(field => (
                <TableCell className="font-heebo text-lg text-center" key={field}>
                  {
                    field === "publishingDate" && book[field]
                      ? new Date(book[field]).toLocaleDateString()
                      : typeof book[field] === "object" && book[field] !== null
                        ? book[field].firstName
                        : book[field]
                  }
                </TableCell>
              ))}


              <TableCell className="font-heebo text-lg text-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(book)}
                  className="hover:bg-[#404C5F]-200"

                >
                  <Pencil className="h-4 w-4 text-[#404C5F]" />
                </Button>
              </TableCell>
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
