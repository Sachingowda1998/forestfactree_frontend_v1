import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ViewWebsiteDetails = () => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      getWebsiteDetails();
  }, []);

  const getWebsiteDetails = async() => {
    let url= `${process.env.REACT_APP_BACKEND_URL}/forestfactree/website-details/all`;
    console.log(url);
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setDetails(data.websiteDetails[0]);
        setLoading(false);
      })
      .catch((err) => {
        Swal.fire("Error", "Failed to fetch details", "error");
        setLoading(false);
      });
  }


  if (loading) return <p>Loading...</p>;

  return (

    <div className="container text-dark mt-5">
      {details ? (
        <div>
<div className="text-center">
            <button className="btn btn-warning mt-3 me-2" onClick={() => (window.location.href = "/admin/editthewebsitedetails")}>
              Edit Website Details
            </button>
</div>

          <h1 className="mb-5">Website Details</h1>
          <p className="fs-4 mb-3"> <b>Email:</b> {details.email}</p>
          <p className="fs-4 mb-3"> <b>Mobile:</b> {details.mobileNumber}</p>
          <p className="fs-4 mb-3"> <b>Alternate Mobile:</b> {details.alternateMobileNumber}</p>
          <p className="fs-4 mb-5"> <b>Address:</b> {details.mailingAddress}</p>

          <h3>About Us Image</h3>
          <img src={`${process.env.REACT_APP_BACKEND_URL}/${details.aboutUsImage}`} alt="About Us" height={400} className="mb-5" />


          <p className="fs-3 mb-3"> <b>About Us Heading:</b> {details.aboutUsHeading}</p>
          <p className="fs-5 mb-4"> <b>About Us Description Part 1:</b> {details.aboutUsDescriptionPart1}</p>
          <p className="fs-5 mb-4"> <b>About Us Description Part 2:</b> {details.aboutUsDescriptionPart2}</p>
          <p className="fs-5 mb-4"> <b>About Us Description Part 3:</b> {details.aboutUsDescriptionPart3}</p>
          <p className="fs-5 mb-4"> <b>About Us Description Part 4:</b> {details.aboutUsDescriptionPart4}</p>

          <h3>Contact Us Image</h3>
          <img src={`${process.env.REACT_APP_BACKEND_URL}/${details.contactUsImage}`} alt="Contact Us" height={400} className="mb-5" />


        </div>
      ) : (
        <div>
          <h1> Unable To Display Website Details, Kindly Check Your Network Connection/Server And Try Again</h1>
        </div>
      )}
    </div>
  );
};

export default ViewWebsiteDetails;
