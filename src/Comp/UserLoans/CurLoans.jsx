import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Submit from './Submit';
import axios from 'axios';

export default function CurLoans({ setCheckedLoans, checkedLoans, handleDelete }) {
  console.log("CurLoans");
  const [userId,setUserId]=useState(1);//זמני👌👌👌👌👌

const handleSubmit = () => {
  console.log(" סבמיט👍👍👍")
  Promise.all(
    checkedLoans.map(i => {
      if(i.Lender)
      console.log("👌👌👌👌👌להשאלה"+i.bookName+" "+i.Lender.firstName+" ");
      return axios.put(`http://localhost:8080/users/BorrowUsersBooks/${userId}/${i._id}`)
        .then(response => {
          console.log(response.data);

        })
        .catch(err => {
          console.error("Cannot borrow user's book", err);
        });
    })
  ).then(() => {
    console.log("All borrow requests completed.");
         setCheckedLoans([]);

  });
};

  return (
    <div className="bg-white max-w-md mx-auto mt-6 p-6 rounded-2xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center border-b pb-2">
        ספרים להשאלה
      </h2>

    

      <div className="overflow-y-auto max-h-64 space-y-3 pr-1">
        {checkedLoans.map(item => (
          <div
            key={item.bookId}
            className="flex items-center justify-between bg-[rgb(147,166,196)] text-white px-4 py-3 rounded-xl shadow hover:bg-[rgb(127,146,176)] transition-colors duration-200"
          >
            <div className="text-right">
              <p className="font-semibold text-lg">{item.bookName}</p>
            </div>

             <div className="relative group">
            <DeleteOutlinedIcon
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  group-hover:hidden cursor-pointer "
                  onClick={() => handleDelete(item.bookName)}
                  />

                {/* DeleteIcon יהיה מוצג בזמן hover */}
                <DeleteIcon

                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 !hidden group-hover:!block cursor-pointer"
                  onClick={() => handleDelete(item.bookName)}
                  />
              
 </div>
          </div>
        ))}

        {checkedLoans.length === 0 && (
          <p className="text-center text-gray-500 mt-4">לא נבחרו ספרים</p>
        )}
      </div>
        <div className="mt-10 mb-4 mx-auto w-fit">
        {/* <Submit  onSubmit={handleSubmit}/> */}
        <button className='w-39' onClick={handleSubmit}>אשר השאלה</button>

      </div>
    </div>
  );
}
