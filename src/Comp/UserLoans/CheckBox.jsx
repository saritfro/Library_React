import React, { useState } from "react";
import { Checkbox } from "primereact/checkbox";
import "../../CSS/CheckBox.css";  

export default function CheckBox() { 
    const [checked, setChecked] = useState(false);

    return (
        <div className="card flex justify-content-center">
            {/* צ'קבוקס עם invalid */}
            <Checkbox 
                invalid={!checked} 
                onChange={(e) => setChecked(e.checked)} 
                checked={checked} 
                className={!checked ? "p-invalid custom-checkbox" : "custom-checkbox"}
            />
        </div>
    )
}
