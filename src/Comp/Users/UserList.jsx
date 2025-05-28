//להוסיף אקצס שיקבל את כל השדות ועליו לעשות מפ וליצור tablecell
import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table.tsx';
import { Button } from '../../components/ui/button.tsx';
import { Pencil } from "lucide-react";
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import axios from "axios";
import { useMyContext } from "../../myContext.jsx";


export default function UserList({ Users, onEdit, onDelete }) {
  const [overedUserId, setOveredUserId] = useState(false)
  const [fields, setfields] = useState([])

  const { fieldsDict } = useMyContext();
  const [Hebrewfields, setHebrewfields] = useState([])
console.log("users"+Users)

  return (
    <div className="overflow-x-auto ">
      <Table className="w-full table-auto border border-gray-200 shadow-sm rounded-lg overflow-hidden">
        <TableHeader className=" text-white-700">
          <TableRow>
            <TableHead className="text-center w-12"></TableHead>
             <TableHead className="text-center">קוד</TableHead>
             <TableHead className="text-center">שם</TableHead>
             <TableHead className="text-center">משפחה</TableHead>
             <TableHead className="text-center">מס' מנויים</TableHead>
            <TableHead className="text-center w-20"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Users.map((User) => (
            <TableRow
              key={User._id}
              className="bg-w-50 h-20 hover:bg-gray-100 transition"
            >
              <TableCell className="relative group flex  justify-center items-center min-h-[60px]">
                {/* DeleteOutlinedIcon יהיה מוסתר בזמן hover */}
                <DeleteOutlinedIcon
                  className="text-[gray] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  group-hover:hidden cursor-pointer "
                  onClick={() => onDelete(User)}
                />

                {/* DeleteIcon יהיה מוצג בזמן hover */}
                <DeleteIcon

                  className="text-[gray] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 !hidden group-hover:!block cursor-pointer"
                  onClick={() => onDelete(User)}
                />
              </TableCell>

                <TableCell className="font-heebo text-lg text-center" >{User.userId}</TableCell>
                <TableCell className="font-heebo text-lg text-center" >{User.firstName}</TableCell>
                <TableCell className="font-heebo text-lg text-center" >{User.lastName}</TableCell>
                <TableCell className="font-heebo text-lg text-center" >{User.subscriptionQuantity}</TableCell>
            
              <TableCell className="font-heebo text-lg text-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(User)}
                  className="hover:bg-[#404C5F]-200"

                >
                  <Pencil className="h-4 w-4 text-[#404C5F]" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {Users.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                לא נמצאו משתמשים
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

    </div>
  );
}
