import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { ProductService } from './ProductService';
import "./Testimonial.css";

export default function Testimonial() {
    const [products, setProducts] = useState([]);
    const responsiveOptions = [
        {
            breakpoint: '1199px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        }
    ];
    
    useEffect(() => {
        ProductService.getProductsSmall().then((data) => setProducts(data.slice(0, 9)));
    }, []);

    const productTemplate = (product) => {
        return (
            <div>
               
            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
                
                <div className="mb-3">
                    <img src={`${product.image}`} alt={product.name} className="w-6 shadow-2" />
                </div>
                <div>
                    <h4 className="mb-1">{product.name}</h4>
                    <h6 className="mt-0 mb-3">{product.price}</h6>
                    {/* <span className={`product-badge border-round status-${product.inventoryStatus.toLowerCase()}`}>{product.inventoryStatus}</span>
                    <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                        <Button icon="pi pi-search" className="p-button p-button-rounded" />
                        <Button icon="pi pi-star-fill" className="p-button-success p-button-rounded" />
                    </div> */}
                </div>
            </div>
            </div>
        );
    };

    return (
        <div className="card">
            <h1 className='testi'>Testimonials from our Customers</h1> 
            <Carousel 
                value={products} 
                numScroll={1} 
                numVisible={3} 
                responsiveOptions={responsiveOptions} 
                itemTemplate={productTemplate} 
                circular autoplayInterval={3000}
                />
        </div>
    )
}
   