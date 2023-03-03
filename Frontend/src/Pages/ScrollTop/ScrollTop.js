
import React from 'react'; 
import { ScrollTop } from 'primereact/scrolltop';


export default function ScrolltoTop() {
    return (
        <div>
                <ScrollTop threshold={100} className="w-2rem h-2rem border-round bg-primary" icon="pi pi-arrow-up text-base" />
        </div>
    );
}
    
