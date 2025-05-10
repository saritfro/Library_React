
import React, { useState } from "react";
import { Button } from 'primereact/button';

export default function Submit() {
    const [loading, setLoading] = useState(false);

    const load = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="card flex flex-wrap justify-content-center gap-3">
            <Button label="Submit" icon="pi pi-check" loading={loading} onClick={load} />
        </div>
    )
}
        