
import React from "react";
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function Form() {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        userName: "",
        passwordOrPhon: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
         axios.get(`http://localhost:8080/users/getUser/${formData.passwordOrPhon}`)
         .then((response)=>{
            const user=response.data;
            if(user&&formData.userName===user.userName)
                navigate("/UserLoans");
            else
                alert("שם מנוי או ססמה לא נכונים");
         })
        .catch((error)=>{
            console.error("Error fetching user:", error.response ? error.response.data : error.message);
            alert("אירעה שגיאה במהלך ההתחברות")
        }) 
        
        if (formData.userName === "חיה" && formData.passwordOrPhon === "1234") {
            navigate("/UserLoans");
        } else {
            alert("שם מנוי או ססמה לא נכונים");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 w-96 mx-auto flex flex-col justify-center"
            style={{ height: '95vh' }}
        >

            <div>
                <label className="text-sm font-medium">שם מנוי</label>
                <Input
                    required
                    value={formData.userName}
                    onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                />
            </div>
            <div>
                <label className="text-sm font-medium">מספר טלפון</label>
                <Input
                    required
                    value={formData.passwordOrPhon}
                    onChange={(e) => setFormData({ ...formData, passwordOrPhon: e.target.value })}
                />
            </div>
            <div className="flex justify-end gap-3 pt-4">
                <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 mx-auto block"
                    style={{ display: 'block', margin: '0 auto' }}
                >
                    התחברות
                </Button>
            </div>
        </form>
    );
}
