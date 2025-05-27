import React, { useState } from "react";
import { Button } from 'primereact/button';

export default function Submit({ onClick }) {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        try {
            // קורא לפונקציה שקיבלת מההורה
            await onClick(); 
        } catch (err) {
            console.error("שגיאה בביצוע הפונקציה:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card flex flex-wrap justify-content-center gap-3">
            <Button label="Submit" icon="pi pi-check" loading={loading} onClick={handleClick} />
        </div>
    );
}
