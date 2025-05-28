import axios from "axios";
import { useState, useEffect } from "react";
import { useMyContext } from "../../myContext.jsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
// import {
//   label
// } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";

export default function SettingForm() {
  const { fieldsDict, exists, setExists } = useMyContext();
  const [Fields, setFields] = useState([]);
  const [formData, setFormData] = useState({
    loanDuration: "",
    lateFee: "",
    subscriptionValidity: "",
    categories: "",
    choosedFields: [],
    managerPass: "",
    numOfBookTosubscription: ""
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
            choosedFields: res.data.choosedFields || [],
            managerPass: res.data.managerPass || "",
            numOfBookTosubscription: res.data.numOfBookTosubscription || ""
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
    <Card className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">הגדרות מערכת</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label>תוקף מנוי (בחודשים)</label>
            <Input
              type="number"
              name="subscriptionValidity"
              onChange={handleChange}
              value={formData.subscriptionValidity}
            />
          </div>

          <div>
            <label>משך השאלה (בשבועות)</label>
            <Input
              type="number"
              name="loanDuration"
              onChange={handleChange}
              value={formData.loanDuration}
            />
          </div>

          <div>
            <label>תשלום לאיחור (בשקלים)</label>
            <Input
              type="number"
              name="lateFee"
              onChange={handleChange}
              value={formData.lateFee}
            />
          </div>

          <div>
            <label>סיסמת מנהל</label>
            <Input
              type="text"
              name="managerPass"
              onChange={handleChange}
              value={formData.managerPass}
            />
          </div>

          <div>
            <label>מספר ספרים למנוי</label>
            <Input
              type="number"
              name="numOfBookTosubscription"
              onChange={handleChange}
              value={formData.numOfBookTosubscription}
            />
          </div>

          <div>
            <label className="block mb-2">בחירת שדות להצגה בטבלה:</label>
            <div className="grid grid-cols-2 gap-2">
              {fieldsDict && Object.entries(fieldsDict).map(([key, label]) => (
                <label key={key} className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.choosedFields.includes(key)}
                    onCheckedChange={(checked) => handleChangeFields(label, checked)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          <CardFooter className="flex justify-end pt-4">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {exists ? "עדכן" : "אישור"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
