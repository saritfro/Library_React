import axios from "axios";
import { useState } from "react";
import CategoryInput from './CategoryInput';
export default function SettingForm() {
  const dict = {
    bookId: "קוד",
    bookName: "שם",
    publishingDate: "תאריך הו'ל",
    publisher: "הו'ל",
    author: "סופר",
    lendingDate: "תאריך השאלה נוכחי",
    copyNumber: "מס' עותק",
    category: "קטגוריה",
    status: "סטטוס",
    Lender: "בהשאלה אצל"
  };
 
  const [categories, setCategories] = useState([""]);
  const [Fields, setFields] = useState([]);
  const [formData, setFormData] = useState({
    loanDuration: "",
    lateFee: "",
    subscriptionValidity: "",
    categories: "",
    choosedFields: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChangeFields = (label, checked) => {
    const updatedFields = checked
      ? [...Fields, label]
      : Fields.filter((item) => item !== label);
    setFields(updatedFields);

    const choosedFields = updatedFields.map(
      (i) => Object.entries(dict).find(([key, value]) => value === i)?.[0]
    );

    setFormData((prev) => ({
      ...prev,
      choosedFields
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", formData);

    axios
      .post("http://localhost:8080/settings/postSettings", formData)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        subscriptionValidity
        <input type="number" name="subscriptionValidity" onChange={handleChange} />
      </label>
      <label>
        loanDuration
        <input type="number" name="loanDuration" onChange={handleChange} />
      </label>
      <label>
        lateFee
        <input type="number" name="lateFee" onChange={handleChange} />
      </label>
<CategoryInput
  handleChange={handleChange}
  categories={categories}
  setCategories={setCategories}
/>
      {Object.entries(dict).map(([key, label]) => (
        <div key={key}>
          <label>
            <input
              type="checkbox"
              name={key}
              onChange={(e) => handleChangeFields(label, e.target.checked)}
            />
            {label}
          </label>
        </div>
      ))}

      <button type="submit">אישור</button>
    </form>
  );
}
