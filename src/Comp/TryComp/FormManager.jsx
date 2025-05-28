
import React from "react";
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from 'react-router-dom';


export default function FormManager() {
      const location = useLocation();
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        password: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8080/manager/login`, {
            password: formData.password
        })
        .then((response) => {
            const { massage, token } = response.data;
            localStorage.setItem("token", token);
            console.log(massage);
            navigate("/Dashboard");
        })
        .catch((error) => {
            console.error("Error fetching user:", error.response ? error.response.data : error.message);
            alert("אין הרשאת גישה");

        }
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 w-96 mx-auto flex flex-col justify-center"
            style={{ height: '100vh' }}
        > 
            <div>
                <label className="text-sm font-medium">ססמה</label>
                <Input
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
            </div>
            <div className="flex justify-end gap-3 pt-4">
                <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 mx-auto block"
                    style={{ display: 'block', margin: '0 auto' }}
                >
                    אישור
                </Button>
            </div>
        </form>
    );
}
