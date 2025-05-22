import { useState } from "react";

export default function CategoryInput({ handleChange, categories, setCategories }) {

  const handleCategoryChange = ( value) => {
    setCategories([...categories,value]);
  };



  const removeCategory = (index) => {
    const updated = categories.filter((_, i) => i !== index);
    setCategories(updated);
  };


  return (
   <>
      <h3>קטגוריות</h3>
      {categories.map((cat, index) => (
        <div key={index} style={{ marginBottom: "8px" }}>
          <input
            type="text"
            value={cat}
            onChange={(e) => handleCategoryChange( e.target.value)}
            
          />
          {categories.length > 1 && (
            <button type="button" onClick={() => removeCategory(index)}>X</button>
          )}
        </div>
      ))}

      <button type="button" name="Categories" onClick={handleChange}>
        לאישור קטגוריות
      </button>
      <br /><br />
      <button >שמור</button>
    </>
  );
}
