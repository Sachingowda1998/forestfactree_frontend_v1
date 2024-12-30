import { Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { allcategories } from "./data";
import Home from "./home";
import AllProducts from "./allproducts";
import Footer from "./footer";
import Farmer from "./farmer";
import ProductPage from "./productpage";
import About from "./about";
import BuyerEnquiry from "./buyerenquiry";
import SellerEnquiry from "./sellerenquiry";
import Testimonials from "./testimonials";
import ContactUs from "./contactus";
import allurls from "./allurls";

// import ScrollToTop from "./scrolltotop";


// import BrandLogo from '../public/TimberLogo-removebg.png';

function UserApp() {

  let[websitedetails, updateWebsiteDetails] = useState({});
  let[newproducts, updateNewProducts] = useState([]);
  let[filteredProducts, setFilteredProducts] = useState([]);
  let[errormsg, updateErrorMsg] = useState();
  let [searchQuery, setSearchQuery] = useState('');

  useEffect(()=>{
    getWebsiteDetails();
    getAllProducts();
  },[]);

  const getWebsiteDetails = async() => {
      // let url = allurls.getWebsiteDetailsUrl;
      let url =  `${process.env.REACT_APP_BACKEND_URL}/forestfactree/website-details/all`;

      try{
      await fetch(url)
      .then(response=>response.json())
      .then(data=>{
        updateWebsiteDetails(data.websiteDetails);
        // console.log(data.websiteDetails);
      })
      }catch(error){
        updateErrorMsg("Error connecting to server, please try again later.")
      }
  }


  const getAllProducts = async() => {
    let url = `${process.env.REACT_APP_BACKEND_URL}/forestfactree/products/all`;

    console.log(url);

    try{
    await fetch(url)
    .then(response=>response.json())
    .then(data=>{
      updateNewProducts(data.products);
      setFilteredProducts(data.products);
    })
    }catch(error){
       updateErrorMsg("Network Issue. Please Try Again Later");
    }
  }

  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      const searchResult = newproducts.filter((product) =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(searchResult);
      navigate('/allproducts');
    }
  };

 
  return (
    <>
      {/* <ScrollToTop/> */}
      <nav className="navbar navbar1 navbar-expand-md bg-light">

        <div className="container-fluid">
          <Link className="navbar-brand navbar-brand1 ms-3" to="/">
                <img src="./TimberLogo-removebg.png" height={80} />
          </Link>
          <span className="navbar-brand navbar-brand1 brand-name fs-5 ms-3 d-none d-md-block">
          MULTIPLEX FOREST FACTREE
          </span>

          <ul className="navbar-nav navbar-nav1 ms-auto">
            <li className="nav-item nav-item1 me-3 d-none d-md-block">
            <img src="/iipm-preview.png" height={80} width={220} />
            </li>
            <li className="nav-item navitem1 me-3">
            <img src="/msme-logo.png" height={80}/>
            </li>
          </ul>
        </div>

      </nav>

      <nav className="navbar navbar2 navbar-expand-sm navbar-dark sticky-top">
        <div className="container-fluid">
        <span className="navbar-brand fs-6 ms-3"> <i className="fa-solid fa-phone text-light"></i> +91-{websitedetails[0]?.mobileNumber} </span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav fw-medium ms-auto">
              <li className="nav-item ms-3">
                <div className="input-group input-group-sm input-group-search mt-1">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search For Products Here"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="btn fw-medium searchbtn" type="button" onClick={handleSearch}>
                    Search
                  </button>
                </div>
              </li>
              <li className="nav-item ms-3">
              <Link className="nav-link active" to="/"> Home </Link>
              </li>
              <li className="nav-item ms-3">
              <Link className="nav-link active" to="/allproducts"> Products </Link>
              </li>
              <li className="nav-item ms-3">
                <Link className="nav-link active" to="/about"> About Us </Link>
              </li>
              <li className="nav-item ms-3">
                <Link className="nav-link active" to="/contactus">Contact Us</Link>
              </li>
              {/* <li className="nav-item ms-3">
                <Link className="nav-link active" to="/buyerenquiry"> Enquire Now </Link>
              </li> */}
              {/* <li className="nav-item dropdown ms-3">
                <a className="nav-link dropdown-toggle active" href="#" role="button" data-bs-toggle="dropdown"> Enquire Now </a>
                <ul className="dropdown-menu navdropdown">
                  <li><Link className="dropdown-item" to="/buyerenquiry"> Buyer Enquiry </Link></li>
                  <li><Link className="dropdown-item" to="/sellerenquiry"> Seller Enquiry </Link></li>
                </ul>
              </li> */}
              {/* <li className="nav-item ms-3">
                <Link className="nav-link active" to="javascript:void(0)"> Logout </Link>
              </li> */}
              
              {/* <li className="nav-item ms-3">
                <Link className="nav-link active" to="javascript:void(0)"> Whatsapp Enquiry </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>


      <Routes>
        <Route exact path="/" element={<><Home/><Farmer/><Testimonials/><Footer websitedetails={websitedetails}/></>}/>
        <Route exact path="/allproducts" element={<><AllProducts newproducts={filteredProducts} /><Farmer /><Footer websitedetails={websitedetails} /></>}/>
        <Route exact path="/productpage/:id" element={<><ProductPage/><Farmer/><Footer websitedetails={websitedetails}/></>}/>
        <Route exact path="/about" element={<><About websitedetails={websitedetails}/><Farmer/><Testimonials/><Footer websitedetails={websitedetails}/></>}/>
        <Route exact path="/buyerenquiry" element={<><BuyerEnquiry/><Farmer/><Footer websitedetails={websitedetails}/></>}/>
        <Route exact path="/sellerenquiry" element={<><SellerEnquiry/><Footer websitedetails={websitedetails}/></>}/>
        <Route exact path="/contactus" element={<><ContactUs websitedetails={websitedetails}/><Farmer/><Testimonials/><Footer websitedetails={websitedetails}/></>}/>
      </Routes>
      <img src="/whatsappicon.png" className="whatsapp-icon"/>
      <img
        src="/uparrowbutton.png"
        className="up-arrow-button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        alt="Scroll to top"
      />

    </>
  );
}

export default UserApp;
