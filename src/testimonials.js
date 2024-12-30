import { useState, useEffect } from "react";

const Testimonials = () => {

    let[testimonials, updateTestimonials] = useState([]);
    let[errormsg, updateErrorMsg] = useState("");

    const getTestimonials = async() => {
        let url = `${process.env.REACT_APP_BACKEND_URL}/forestfactree/testimonials/all`;

        try{
        await fetch(url)
        .then(response=>response.json())
        .then(data=>{
            updateTestimonials(data.testimonials);
        })
        }catch(error){
            updateErrorMsg("Network Error. Please Try Later");
        }
    }

    useEffect(()=>{
        getTestimonials();
    },[]);

    return (
        <section className="testimonials home-bg pb-5">
            <div className="container-fluid">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-10 col-xl-8 text-center">
                        <h3 className="mb-4 fw-bolder text-white">Our Testimonials</h3>
                        {/* <p className="mb-4 pb-2 mb-md-5 pb-md-0">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error amet
                            numquam iure provident voluptate esse quasi, veritatis totam voluptas nostrum
                            quisquam eum porro a pariatur veniam.
                        </p> */}
                    </div>
                </div>
    
                <div className="row text-center d-flex align-items-stretch">
                    {
                        testimonials.map((testimonial, index)=>{
                            return(

                                <div key={index} className="col-md-4 mb-5 mb-md-0 d-flex align-items-stretch">
                                <div className="card testimonial-card">
                                    <div className="card-up" style={{ backgroundColor: '#9d789b' }}></div>
                                    <div className="avatar mx-auto bg-white">
                                        <img
                                            src={`${process.env.REACT_APP_BACKEND_URL}/${testimonial.profileImage}`}
                                            className="rounded-circle img-fluid"
                                            alt={testimonial.name}
                                        />
                                    </div>
                                    <div className="card-body">
                                        <h4 className="mb-4"> {testimonial.name} </h4>
                                        <hr />
                                        <p className="dark-grey-text mt-4 fs-6">
                                            <i className="fas fa-quote-left pe-2"></i> {testimonial.description}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            )
                        })
                    }
                    {/* <div className="col-md-4 mb-5 mb-md-0 d-flex align-items-stretch">
                        <div className="card testimonial-card">
                            <div className="card-up" style={{ backgroundColor: '#9d789b' }}></div>
                            <div className="avatar mx-auto bg-white">
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
                                    className="rounded-circle img-fluid"
                                    alt="Maria Smantha"
                                />
                            </div>
                            <div className="card-body">
                                <h4 className="mb-4"> Jane Doe </h4>
                                <hr />
                                <p className="dark-grey-text mt-4">
                                    <i className="fas fa-quote-left pe-2"></i> The buying experience was very smooth in this platform. The products we purchased were of the finest quality. Definitely recommend this website for your timber needs.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-5 mb-md-0 d-flex align-items-stretch">
                        <div className="card testimonial-card">
                            <div className="card-up" style={{ backgroundColor: '#7a81a8' }}></div>
                            <div className="avatar mx-auto bg-white">
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp"
                                    className="rounded-circle img-fluid"
                                    alt="Lisa Cudrow"
                                />
                            </div>
                            <div className="card-body">
                                <h4 className="mb-4">Lisa Cudrow</h4>
                                <hr />
                                <p className="dark-grey-text mt-4">
                                    <i className="fas fa-quote-left pe-2"></i> I got the best deal for my timber products through this platform. We were assisted thorughout the entire process and the entire experience was seamless. Would like to do business with them again. 
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-0 d-flex align-items-stretch">
                        <div className="card testimonial-card">
                            <div className="card-up" style={{ backgroundColor: '#6d5b98' }}></div>
                            <div className="avatar mx-auto bg-white">
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(9).webp"
                                    className="rounded-circle img-fluid"
                                    alt="John Smith"
                                />
                            </div>
                            <div className="card-body">
                                <h4 className="mb-4">John Smith</h4>
                                <hr />
                                <p className="dark-grey-text mt-4">
                                    <i className="fas fa-quote-left pe-2"></i> This platform provides a means for farmers to sell their timber products at the best price without any hassles as well as for buyers to buy excellent quality products. Definitely give it a try.
                                </p>
                            </div>
                        </div>
                    </div> */}

                </div>
            </div>
        </section>
    );
};

export default Testimonials;
