import { Link } from "react-router-dom";

const Farmer = () => {
    return (
        <div className="farmer home-bg p-4 pt-1 pb-5">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-2"></div>
                    <div className="col-lg-8 text-center farmer-div shadow p-4">
                        <i className="fa-solid fa-7x fa-pull-left fa-tractor text-light"></i>
                        <h5 className="text-start"> If you are a farmer/seller and you want to sell your products to us at the best prices, kindly contact us or click the seller enquiry button. </h5>
                        <Link to="/sellerenquiry" className="btn btn-lg custom-btn fw-medium mt-1"> Seller Enquiry </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Farmer;