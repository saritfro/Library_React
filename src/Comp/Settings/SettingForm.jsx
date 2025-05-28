import axios from "axios";
import { useState, useEffect } from "react";
import { useMyContext } from "../../myContext.jsx";

export default function SettingForm() {
  const { fieldsDict, exists, setExists } = useMyContext();
  const [Fields, setFields] = useState([]);
  const [formData, setFormData] = useState({
    loanDuration: "",
    lateFee: "",
    subscriptionValidity: "",
    categories: "",
    choosedFields: []
  });

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const res = await axios.get("http://localhost:8080/settings/getSettings");
        if (res.data) {
          setExists(true);
          setFormData({
            loanDuration: res.data.loanDuration || "",
            lateFee: res.data.lateFee || "",
            subscriptionValidity: res.data.subscriptionValidity || "",
            categories: res.data.categories || "",
            choosedFields: res.data.choosedFields || []
          });

          const selectedHebrewFields = (res.data.choosedFields || []).map(i =>
            i in fieldsDict ? fieldsDict[i] : i
          );
          setFields(selectedHebrewFields);
        } else {
          setExists(false);
        }
      } catch (e) {
        console.log("אין הגדרות קיימות, מעבר ליצירה חדשה");
        setExists(false);
      }
    };

    fetchFields();
  }, [fieldsDict, setExists]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
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
      (i) => Object.entries(fieldsDict).find(([key, value]) => value === i)?.[0]
    );

    setFormData(prev => ({
      ...prev,
      choosedFields
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = exists
      ? "http://localhost:8080/settings/putSettings"
      : "http://localhost:8080/settings/postSettings";

    const method = exists ? axios.put : axios.post;

    method(url, formData)
      .then((res) => {
        console.log(res.data);
        setExists(true);
      })
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        תוקף מנוי
        <input
          type="number"
          name="subscriptionValidity"
          onChange={handleChange}
          value={formData.subscriptionValidity}
        />
        חודשים
      </label><br />

      <label>
        משך השאלה
        <input
          type="number"
          name="loanDuration"
          onChange={handleChange}
          value={formData.loanDuration}
        />
        שבועות
      </label><br />

      <label>
        תשלום לאיחור
        <input
          type="number"
          name="lateFee"
          onChange={handleChange}
          value={formData.lateFee}
        />
        שקלים
      </label><br />

      <label>בחירת שדות בטבלה</label>
      {fieldsDict && Object.entries(fieldsDict).map(([key, label]) => (
        <div key={key}>
          <label>
            <input
              type="checkbox"
              name={key}
              checked={formData.choosedFields.includes(key)}
              onChange={(e) => handleChangeFields(label, e.target.checked)}
            />
            {label}
          </label>
        </div>
      ))}

      <button type="submit">{exists ? "עדכן" : "אישור"}</button>
    </form>
  );
}
