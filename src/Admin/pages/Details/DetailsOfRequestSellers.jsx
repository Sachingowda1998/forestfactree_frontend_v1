import React from "react";

const sellers = [
  {
    id: "1",
    name: "Ravi Kumar",
    email: "ravikumar@example.com",
    phoneNo: "9876543210",
    whatsappNo: "9876543210",
    location: "Delhi",
    state: "Delhi",
    images: [
      "image1.jpg",
      "image2.jpg",
      "image3.jpg",
      "image4.jpg",
      "image5.jpg",
    ],
    noOfTrees: 50,
    pricePerTree: 30,
  },
  {
    id: "2",
    name: "Priya Sharma",
    email: "priyasharma@example.com",
    phoneNo: "9988776655",
    whatsappNo: "9988776655",
    location: "Mumbai",
    state: "Maharashtra",
    images: [
      "image6.jpg",
      "image7.jpg",
      "image8.jpg",
      "image9.jpg",
      "image10.jpg",
    ],
    noOfTrees: 30,
    pricePerTree: 30,
  },
  {
    id: "3",
    name: "Vikram Yadav",
    email: "vikramyadav@example.com",
    phoneNo: "9876012345",
    whatsappNo: "9876012345",
    location: "Bengaluru",
    state: "Karnataka",
    images: [
      "image11.jpg",
      "image12.jpg",
      "image13.jpg",
      "image14.jpg",
      "image15.jpg",
    ],
    noOfTrees: 60,
    pricePerTree: 30,
  },
  {
    id: "4",
    name: "Anita Desai",
    email: "anitadesai@example.com",
    phoneNo: "9123456789",
    whatsappNo: "9123456789",
    location: "Chennai",
    state: "Tamil Nadu",
    images: [
      "image16.jpg",
      "image17.jpg",
      "image18.jpg",
      "image19.jpg",
      "image20.jpg",
    ],
    noOfTrees: 40,
    pricePerTree: 30,
  },
  {
    id: "5",
    name: "Ajay Singh",
    email: "ajaysingh@example.com",
    phoneNo: "8456739210",
    whatsappNo: "8456739210",
    location: "Hyderabad",
    state: "Telangana",
    images: [
      "image21.jpg",
      "image22.jpg",
      "image23.jpg",
      "image24.jpg",
      "image25.jpg",
    ],
    noOfTrees: 25,
    pricePerTree: 30,
  },
  {
    id: "6",
    name: "Sonia Patel",
    email: "soniapatel@example.com",
    phoneNo: "9234785621",
    whatsappNo: "9234785621",
    location: "Ahmedabad",
    state: "Gujarat",
    images: [
      "image26.jpg",
      "image27.jpg",
      "image28.jpg",
      "image29.jpg",
      "image30.jpg",
    ],
    noOfTrees: 70,
    pricePerTree: 30,
  },
  {
    id: "7",
    name: "Amit Kapoor",
    email: "amitkapoor@example.com",
    phoneNo: "9776452389",
    whatsappNo: "9776452389",
    location: "Lucknow",
    state: "Uttar Pradesh",
    images: [
      "image31.jpg",
      "image32.jpg",
      "image33.jpg",
      "image34.jpg",
      "image35.jpg",
    ],
    noOfTrees: 15,
    pricePerTree: 30,
  },
  {
    id: "8",
    name: "Neha Gupta",
    email: "nehagupta@example.com",
    phoneNo: "8001234567",
    whatsappNo: "8001234567",
    location: "Kolkata",
    state: "West Bengal",
    images: [
      "image36.jpg",
      "image37.jpg",
      "image38.jpg",
      "image39.jpg",
      "image40.jpg",
    ],
    noOfTrees: 100,
    pricePerTree: 30,
  },
  {
    id: "9",
    name: "Suresh Reddy",
    email: "sureshreddy@example.com",
    phoneNo: "9745632100",
    whatsappNo: "9745632100",
    location: "Pune",
    state: "Maharashtra",
    images: [
      "image41.jpg",
      "image42.jpg",
      "image43.jpg",
      "image44.jpg",
      "image45.jpg",
    ],
    noOfTrees: 80,
    pricePerTree: 30,
  },
  {
    id: "10",
    name: "Simran Kaur",
    email: "simrankaur@example.com",
    phoneNo: "9876765432",
    whatsappNo: "9876765432",
    location: "Chandigarh",
    state: "Chandigarh",
    images: [
      "image46.jpg",
      "image47.jpg",
      "image48.jpg",
      "image49.jpg",
      "image50.jpg",
    ],
    noOfTrees: 55,
    pricePerTree: 30,
  },
  {
    id: "11",
    name: "Arun Joshi",
    email: "arunjoshi@example.com",
    phoneNo: "9987654321",
    whatsappNo: "9987654321",
    location: "Noida",
    state: "Uttar Pradesh",
    images: [
      "image51.jpg",
      "image52.jpg",
      "image53.jpg",
      "image54.jpg",
      "image55.jpg",
    ],
    noOfTrees: 90,
    pricePerTree: 30,
  },
  {
    id: "12",
    name: "Maya Rao",
    email: "mayarao@example.com",
    phoneNo: "9112233445",
    whatsappNo: "9112233445",
    location: "Jaipur",
    state: "Rajasthan",
    images: [
      "image56.jpg",
      "image57.jpg",
      "image58.jpg",
      "image59.jpg",
      "image60.jpg",
    ],
    noOfTrees: 120,
    pricePerTree: 30,
  },
  {
    id: "13",
    name: "Ravi Tiwari",
    email: "ravitiwari@example.com",
    phoneNo: "8223344556",
    whatsappNo: "8223344556",
    location: "Indore",
    state: "Madhya Pradesh",
    images: [
      "image61.jpg",
      "image62.jpg",
      "image63.jpg",
      "image64.jpg",
      "image65.jpg",
    ],
    noOfTrees: 40,
    pricePerTree: 30,
  },
  {
    id: "14",
    name: "Sweta Agarwal",
    email: "swetaagarwal@example.com",
    phoneNo: "9822334455",
    whatsappNo: "9822334455",
    location: "Surat",
    state: "Gujarat",
    images: [
      "image66.jpg",
      "image67.jpg",
      "image68.jpg",
      "image69.jpg",
      "image70.jpg",
    ],
    noOfTrees: 25,
    pricePerTree: 30,
  },
  {
    id: "15",
    name: "Aman Bhatia",
    email: "amanbhatia@example.com",
    phoneNo: "9345678901",
    whatsappNo: "9345678901",
    location: "Patna",
    state: "Bihar",
    images: [
      "image71.jpg",
      "image72.jpg",
      "image73.jpg",
      "image74.jpg",
      "image75.jpg",
    ],
    noOfTrees: 150,
    pricePerTree: 30,
  },
];

function DetailsOfRequestSellers() {
  return <div>DetailsOfRequestSellers</div>;
}

export default DetailsOfRequestSellers;
