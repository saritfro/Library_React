import React, { createContext, useContext, useState } from 'react';

// יצירת הקונטקסט
const myContext = createContext();

// ה-Provider: עוטף את האפליקציה
export default function MyProvider({ children }) {
  const [fieldsDict, setfieldsDict] = useState({
    bookId: "מזהה ספר",
    bookName: "שם ספר",
    publishingDate: "תאריך הו'ל",
    publisher: "מו'ל",
    author: "סופר",
    lendingDate: "תאריך השאלה נוכחית",
    copyNumber: "מס' עותק",
    category: "קטגוריה",
    status: "סטטוס",
    Lender: "משאיל"
  }); 
    const [exists, setExists] = useState(false);

  return (
    <myContext.Provider value={{ fieldsDict, setfieldsDict ,exists ,setExists}}>
{children}    </myContext.Provider>
  );
}

// הוק לשימוש נוח בקונטקסט
export function useMyContext() {
  return useContext(myContext);
}
