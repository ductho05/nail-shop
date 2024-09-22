import React from "react";

export default function AdminLayout ({children}: {children: React.ReactNode}) {

    return (
        <div>
            Admin layout
            {children}
        </div>
    )
}