// import { useState } from "react";

// export default function CategoryInput({ handleChange, categories, setCategories }) {

//   const handleCategoryChange = ( value) => {
//     setCategories([...categories,value])
//     console.log(categories)
//   };



//   const removeCategory = (index) => {
//     const updated = categories.filter((_, i) => i !== index);
//     setCategories(updated);
//   };

// const handleConfirmCategories = (e) => {
//   const filtered = categories.filter((c) => c.trim() !== "");
//   console.log("קטגוריות שאושרו:", filtered);
//   handleChange(e.name,e.value)
//   // אם צריך, תעדכני ב-state או תשלחי לשרת
// };

//   return (
//    <>
//       <h3>קטגוריות</h3>
//       {categories.map((cat, index) => (
//         <div key={index} style={{ marginBottom: "8px" }}>
//           <input
//             type="text"
//             value={cat}
//             onChange={(e) => handleCategoryChange( e.target.value)}
            
//           />
//           {categories.length > 1 && (
//             <button type="button" onClick={() => removeCategory(index)}>X</button>
//           )}
//         </div>
//       ))}

//       <button type="button" name="Categories" onClick={handleConfirmCategories(e)}>
//         לאישור קטגוריות
//       </button>
//       <br /><br />
//       <button >שמור</button>
//     </>
//   );
// }
