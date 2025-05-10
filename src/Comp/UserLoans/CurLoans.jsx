import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Submit from './Submit';
export default function SimpleList() {
  const [items, setItems] = useState([
    { id: 1, name: "א", category: "קטגוריה א" },
    { id: 2, name: "ב", category: "קטגוריה ב" },
    { id: 3, name: "ג", category: "קטגוריה ג" },
    { id: 4, name: "ד", category: "קטגוריה ד" },
    { id: 5, name: "ה", category: "קטגוריה ה" },
    { id: 6, name: "ו", category: "קטגוריה ו" },
    { id: 7, name: "ז", category: "קטגוריה ז" },
    { id: 8, name: "ח", category: "קטגוריה ח" },
    { id: 9, name: "ט", category: "קטגוריה ט" },
    { id: 10, name: "י", category: "קטגוריה י" },
  ]);

  const handleDelete = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className=" bg-white max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">רשימת פריטים</h2>
      <Submit/>
      {/* דיב שמכיל את הגלילה */}
      <div className="overflow-y-auto max-h-60"> {/* גובה קבוע וגלילה */}
        {/* רשימה בלי הפרדה בין פריטים */}
        {items.map(item => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white p-4 shadow rounded hover:bg-gray-50 transition"
          >
            <div>
              <p className="font-bold">{item.name}</p>
              <p className="text-sm text-gray-500">{item.category}</p>
            </div>
            <div className="relative group">
            <DeleteOutlinedIcon
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  group-hover:hidden cursor-pointer "
                  onClick={() => handleDelete(item.id)}
                  />

                {/* DeleteIcon יהיה מוצג בזמן hover */}
                <DeleteIcon

                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 !hidden group-hover:!block cursor-pointer"
                  onClick={() => handleDelete(item.id)}
                  />
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
