
const Footer = ({websitedetails}) => {
    return(
        <div className="footer pt-5 pb-2">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3 p-3 mb-3 text-dark">
                        <img src="./TimberLogo-removebg.png" className="mb-3" height={150}/>
                        <h6> Contact Us : </h6>
                        <h6> Email : {websitedetails[0]?.email} </h6>
                        <h6> Contact Number: +91-{websitedetails[0]?.mobileNumber} </h6>
                    </div>

                    <div className="col-lg-4 p-4 mb-3 d-flex align-items-start text-dark">
                        <p className="fw-medium fs-6"> {websitedetails[0]?.mailingAddress} </p>
                    </div>

                    <div className="col-lg-5 p-4 mb-3">
                        <img src="./iipm-preview.png" height={100} width={250} className="me-5 mb-3" />
                        <img src="./msme-logo.png" height={100} />

                        <p className="mt-5 text-success">
                            <i className="fa-brands fa-facebook fa-2x me-4"></i>
                            <i className="fa-brands fa-instagram fa-2x me-4"></i>
                            <i className="fa-brands fa-linkedin fa-2x me-4"></i>
                            <i className="fa-brands fa-whatsapp fa-2x me-4"></i>
                        </p>
                    </div>

                    

                    
                </div>
            </div>
        </div>
    )
}

export default Footer;