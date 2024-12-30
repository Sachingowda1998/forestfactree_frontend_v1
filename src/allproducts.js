import {products} from './data';
import {allcategories} from './data';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AllProducts = ( {newproducts} ) => {

    let[newcategories, updateNewCategories] = useState([]);
    let[selectedSubcategories, setSelectedSubcategories] = useState([]);
    let[errormsg, updateErrorMsg] = useState();

    const [activeIndices, setActiveIndices] = useState([0]);

    const handleToggle = (index) => {
        // Check if index is already in the activeIndices array
        if (activeIndices.includes(index)) {
            // If it is, remove it (close the category)
            setActiveIndices(activeIndices.filter((i) => i !== index));
        } else {
            // Otherwise, add it (open the category)
            setActiveIndices([...activeIndices, index]);
        }
    };

    const handleCheckboxChange = (subcategory) => {
        if (selectedSubcategories.includes(subcategory)) {
            setSelectedSubcategories(selectedSubcategories.filter((sc) => sc !== subcategory));
        } else {
            setSelectedSubcategories([...selectedSubcategories, subcategory]);
        }
    };
    
    const filteredProducts = newproducts.filter(product =>
        selectedSubcategories.length === 0 || selectedSubcategories.includes(product.subcategory)
    );
    
    const getAllCategories = async() => {
        let url = `${process.env.REACT_APP_BACKEND_URL}/forestfactree/categories`;
    
        try{
        await fetch(url)
        .then(response=>response.json())
        .then(data=>{
            updateNewCategories(data);
        })
        }catch(error){
            updateErrorMsg("Network Issue. Please Try Again Later");
        }
    }

    // Function to truncate product names 
    const truncateName = (name) => { 
    return name.length > 20 ? name.substring(0, 20) + '...' : name;
    };

    useEffect(()=>{
        getAllCategories();
    },[]);


    return (
        <div className="allproduct-block home-bg pb-5">
            
            <section className="container-fluid pt-4">

                <nav aria-label="breadcrumb" className='mb-4'>

                    {/* <div className='row'> */}
                        {/* <div className='col-6 col-sm-6 col-md-7'> */}
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page"> All Products </li>
                            </ol>
                        {/* </div> */}

                        {/* <div className='col-6 col-sm-6 col-md-5'>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search For Products Here"
                                />
                                <button className="btn btn-success" type="button">
                                    Search
                                </button>
                            </div>
                        </div> */}
                    {/* </div> */}
                </nav>


                <div className="row">
                    <div className="col-lg-3 mb-4">
                        <div className='p-3 rounded shadow bg-white web-sticky'>
                            <h5 className="mb-3 text-center text-dark">Filter by Category</h5>
                            <div id="categoryFilters" className="accordion">
                                {newcategories.map((category, catIndex) => (
                                    <div className="accordion-item" key={catIndex}>
                                        <h6 className="accordion-header" id={`heading-${catIndex}`}>
                                            <button
                                                className={`acc-btn accordion-button ${activeIndices.includes(catIndex) ? '' : 'collapsed'}`}
                                                type="button"
                                                onClick={() => handleToggle(catIndex)}
                                            >
                                                {category.name}
                                            </button>
                                        </h6>
                                        <div
                                            id={`collapse-${catIndex}`}
                                            className={`accordion-collapse collapse ${activeIndices.includes(catIndex) ? 'show' : ''}`}
                                            aria-labelledby={`heading-${catIndex}`}
                                        >
                                            <div className="accordion-body">
                                                {category.subcategories.map((subcat, subIndex) => (
                                                    <div className="form-check" key={subIndex}>
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id={`${category.name}-${subcat.sname}`}
                                                            value={subcat.sname}
                                                            checked={selectedSubcategories.includes(subcat.sname)}
                                                            onChange={() => handleCheckboxChange(subcat.sname)}
                                                        />

                                                        <label
                                                            className="form-check-label"
                                                            htmlFor={`${category.name}-${subcat.sname}`}
                                                        >
                                                            {subcat.sname}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-9">
                        <div className='p-3 rounded shadow bg-white'>
                            <div className="row">
                                <h3 className='text-center mb-4 text-dark'> Number Of Products : {filteredProducts.length} </h3>
                                {filteredProducts.map((product, index) => {
                                    return (
                                        <div className="col-12 col-sm-12 col-md-6 col-lg-4 mb-4" key={index}>
                                            <div className="p-3 border">
                                                <div className="img-container prod-img mb-2">
                                                    <Link to={`/productpage/${product._id}`}>
                                                        <img
                                                            src={`${process.env.REACT_APP_BACKEND_URL}/${product.images[0]}`} // Dynamic image source
                                                            alt={product.productName}   // Dynamic alt text
                                                            className="img-fluid"
                                                        />
                                                    </Link>
                                                    <Link to={`/productpage/${product._id}`} className='btn explore-button'> View Product </Link>
                                                </div>
                                                <h5 className="mb-2 text-dark"> {truncateName(product.productName)} </h5> {/* Dynamic product name */}
                                                <h6 className="mb-3 text-dark"> {product.shortDescription} </h6>
                                                <Link to="/buyerenquiry" className="btn fw-medium w-100 seeallbtn">
                                                    Enquire Now 
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })}
    
    
                            </div>
                        </div>
                    </div>
                </div>
    
            </section>
        </div>
    )
        
}

export default AllProducts;