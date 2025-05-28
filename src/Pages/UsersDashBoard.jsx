import React, { useRef, useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import UserFilters from "../Comp/Users/UserFilters";
import UserForm from "../Comp/Users/UserForm";
import UserList from "../Comp/Users/UserList";
import { Plus, Search } from "lucide-react";
import axios from "axios";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { Card, CardContent } from "../components/ui/card";


// import CardWithForm from './Comp/TryComp/Card.jsx'; // דוגמה לשימוש ברכיב כרטיס עם טופס

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function UsersDashBoard() {
  const toast = useRef(null);
  //צריך להפוך לגלובלי
  const [Users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: "הכל",
    status: "הכל",
    searchTerm: ""
  });

  useEffect(() => {
    axios.get("http://localhost:8080/users/getAllUsers")
      .then((response) => {
        setUsers(response.data);
        console.log("Users:", JSON.stringify(response.data, null, 2));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        console.log(err + "cant load all Users")
        setLoading(false);
        console.error("MyError fetching Users:", err);
      });
  }, []);

  const handleSubmit = async (UserData) => {
    try {
      if (editingUser) {
        const res = await axios.put(
          `http://localhost:8080/manager/putUser/${editingUser.UserId}`,
          UserData
        );
        const updatedUsers = Users.map(User =>
          User.UserId === editingUser.UserId ? res.data : User
        );
        setUsers(updatedUsers);
      } else {
        const res = await axios.post("http://localhost:8080/Users/postUser", {
          publishingDate: Date.now(),
          ...UserData
        });
        setUsers([...Users, res.data]);
      }
    } catch (error) {
      console.error("שגיאה בשמירה לשרת:", error);
    }

    setShowForm(false);
    setEditingUser(null);
  };

  const handleEdit = (User) => {
    setEditingUser(User);
    setShowForm(true);
  };

  const handleDelete = (User) => {
    axios
      .delete(`http://localhost:8080/Users/deleteUser/${User._id}`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const filteredUsers = Users.filter((User) => {
    const categoryMatch = filters.firstName === "הכל" || User.category === filters.category;
    const statusMatch = filters.lastName === "הכל" || User.status === filters.status;
    const searchMatch =
      (User.UserName?.toLowerCase().includes(filters.searchTerm.toLowerCase()) || "") ||
      (User.publisher?.toLowerCase().includes(filters.searchTerm.toLowerCase()) || "");
    return categoryMatch && statusMatch && searchMatch;
  });

  const handleUpload = (event) => {
    let fileList = event.files || event?.target?.files;
    if (!fileList || fileList.length === 0) {
      console.warn("No file selected");
      return;
    }

    const file = fileList[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workUser = XLSX.read(data, { type: "array" });
        const sheetName = workUser.SheetNames[0];
        const sheet = workUser.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet);

        toast.current.show({
          severity: "success",
          summary: "קובץ עלה בהצלחה",
          detail: "הספרים הוספו לרשימה",
          life: 3000
        });

        setUsers([...Users, ...json]);

        for (let d of json) {
          axios
            .post("http://localhost:8080/Users/postUser", d)
            .then((res) => console.log(res))
            .catch((err) => console.error("Failed to post to server:", err));
        }
      } catch (e) {
        console.log("Error reading file:", e);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (

    <div className="max-w-6xl mx-auto p-4">
      {/* כרטיס עם כפתור הוספה וייבוא */}
      <div
        style={{
          backgroundImage: `url('/images/Users.jpg')`
        }}></div>
      <Card className="w-full  text-white rounded-xl shadow p-4 mb-6" style={{ backgroundColor: "rgb(102 130 173 / 68%)" }}>
        <CardContent className="flex flex-col md:flex-row  items-center gap-4">

          {/* כפתור הוספת ספר חדש */}
          <Button onClick={() => setShowForm(true)} className="bg-white  hover:bg-gray-100" style={{ color: "rgb(147 166 196)" }}>
            <Plus className="w-5 h-5 ml-2" />
           הוספת משתמש חדש          </Button>

          {/* כפתור ייבוא קובץ – מעוצב זהה */}
          <div className="p-0">
            <FileUpload
              mode="basic"
              name="file"
              accept=".xlsx,.csv"
              onSelect={handleUpload}
              chooseLabel="ייבוא קובץ"
              className="custom-upload"
            />
          </div>

        </CardContent>

        {/* עיצוב מותאם אישית לכפתור ייבוא */}
        <style>
          {`
            .custom-upload > .p-button {
              background-color: white !important;
              color: rgb(147 166 196) !important;
              border: none !important;
              padding: 0.5rem 1rem !important;
              font-weight: 500;
              border-radius: 0.5rem;
              box-shadow: 0 1px 2px rgba(0,0,0,0.1);
              transition: background-color 0.2s;
            }

            .custom-upload > .p-button:hover {
              background-color: #f3f4f6 !important;
            }
          `}
        </style>
      </Card>

      <Toast ref={toast} />

      {/* מסננים + חיפוש */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              placeholder="חיפוש לפי כותר או מחבר..."
              className="pr-10"
              value={filters.searchTerm}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, searchTerm: e.target.value }))
              }
            />
          </div>
          {/* <UserFilters filters={filters} setFilters={setFilters} /> */}
        </div>

        <UserList Users={Users} onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      {/* טופס הוספה/עריכה */}
      {showForm && (
        <UserForm
          User={editingUser}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingUser(null);
          }}
        />
      )}
    </div>
  );
}
