import jsPDF from "jspdf";
import "jspdf-autotable";
import converter from "number-to-words";

const order = {
  _id: "123456",
  address: {
    firstName: "John",
    lastName: "Doe",
    addressLine1: "123 Maple Street",
    addressLine2: "Apt 4B",
    city: "Springfield",
    state: "Illinois",
    zipCode: "62704",
  },
  paymentTerm: "Net 30",
  type: "Credit Card",
  price: 1500, // Total price
  orderDate: "2024-11-21T10:30:00.000Z",
  items: [
    {
      productName: "Wooden Table",
      variant: { size: "Medium", quantity: 2 },
      totalPrice: 1000,
    },
    {
      productName: "Wooden Chair",
      variant: { size: "Standard", quantity: 4 },
      totalPrice: 500,
    },
  ],
};

// export const DownloadInvoice = () => {
//   const logoURL = "/assets/wood4.jpg";
//   const date = new Date().toLocaleDateString();
//   const doc = new jsPDF();

//   doc.rect(5, 5, 200, 287);
//   doc.setLineWidth(0.5);

//   doc.addImage(logoURL, "PNG", 15, 10, 30, 30);
//   doc.setFontSize(16);
//   doc.text("Invoice", 135, 20);
//   doc.setFontSize(10);
//   doc.text(`Date: ${date}`, 135, 25);
//   doc.text(`Order ID: ${order._id}`, 135, 30);

//   doc.line(10, 45, 200, 45);

//   doc.setFontSize(12);
//   doc.text("Customer Details", 15, 55);
//   doc.setFont("bold");
//   doc.text(`${order.address.firstName} ${order.address.lastName}`, 15, 60);
//   doc.text(
//     `${order.address.addressLine1}, ${order.address.addressLine2}`,
//     15,
//     65
//   );
//   doc.text(`${order.address.city}, ${order.address.state}`, 15, 70);
//   doc.text(`${order.address.zipCode}`, 15, 75);

//   doc.setLineDashPattern([3, 3], 0);
//   const width = doc.internal.pageSize.getWidth();
//   // const height = doc.internal.pageSize.getWidth();
//   const middleX = width / 2;
//   doc.line(middleX, 50, middleX, 80);

//   const dateOnly = new Date(order.orderDate).toISOString().split("T")[0];

//   doc.text(`Payment Terms: ${order.paymentTerm}`, 120, 55);
//   doc.text(`Paid Through: ${order.type}`, 120, 60);
//   doc.text(`Total: ${order.price}`, 120, 65);
//   doc.text(`Order Date: ${dateOnly}`, 120, 70);

//   doc.setLineDashPattern([], 0);
//   doc.line(10, 81, 200, 81);

//   const tableColumnHeaders = [
//     "Sr.No",
//     "Products",
//     "Variants",
//     "Quantity",
//     "GST %",
//     "Amount (INR)",
//   ];
//   const tableData = order.items.map((product, index) => [
//     index + 1,
//     product.productName,
//     product.variant.size,
//     product.variant.quantity,
//     18,
//     product.totalPrice,
//   ]);

//   doc.setFont("normal");
//   doc.autoTable({
//     startX: 5,
//     startY: 84,
//     head: [tableColumnHeaders],
//     body: tableData,
//     theme: "grid",
//     headStyles: { fillColor: [22, 160, 133] },
//   });

//   // const totalAmount = order.products.reduce((acc, product) => {
//   //   return acc + product.totalprice + product.gst;
//   // }, 0);

//   const totalAmountInWords = converter.toWords(order.price);

//   doc.line(10, doc.lastAutoTable.finalY + 3, 200, doc.lastAutoTable.finalY + 3);

//   doc.setFontSize(12);
//   doc.setFont("bold");
//   doc.text(
//     `Total(in words): ${totalAmountInWords} Only`,
//     15,
//     doc.lastAutoTable.finalY + 10
//   );
//   doc.setFontSize(15);
//   doc.text(`Total Amount: ${order.price}`, 150, doc.lastAutoTable.finalY + 10);

//   const footerStartY = 270;
//   doc.line(10, footerStartY - 6, 200, footerStartY - 6);
//   doc.setFontSize(12);
//   doc.setFont("normal");

//   doc.text("Remarks:", 10, footerStartY);
//   doc.text("Thank you for your business!", 10, footerStartY + 5);
//   doc.text(`${date}`, 10, footerStartY + 10);

//   doc.text("Company Name", 140, footerStartY);
//   doc.text("Address Line 1", 140, footerStartY + 5);
//   doc.text("Address Line 2", 140, footerStartY + 10);
//   doc.text("Contact: +91-1234567890", 140, footerStartY + 15);
//   doc.text("Email: contact@company.com", 140, footerStartY + 20);

//   doc.save(`Invoice_${order._id}.pdf`);
// };

export const DownloadInvoice = (selectedOrder) => {
  const logoURL = "/assets/wood4.jpg";
  const date = new Date().toLocaleDateString();
  const doc = new jsPDF();

  doc.rect(5, 5, 200, 287);
  doc.setLineWidth(0.5);

  doc.addImage(logoURL, "PNG", 15, 10, 30, 30);
  doc.setFontSize(16);
  doc.text("Invoice", 135, 20);
  doc.setFontSize(10);
  doc.text(`Date: ${date}`, 135, 25);
  doc.text(`Order ID: ${selectedOrder.SlNo}`, 135, 30);

  doc.line(10, 45, 200, 45);

  doc.setFontSize(12);
  doc.text("Customer Details", 15, 55);
  doc.setFont("bold");
  doc.text(`${selectedOrder.FirstName} ${selectedOrder.LastName}`, 15, 60);
  doc.text(`${selectedOrder.Address}`, 15, 65);
  doc.text(`${selectedOrder.City}, ${selectedOrder.State}`, 15, 70);
  doc.text(`${selectedOrder.ZipCode}`, 15, 75);

  // Add payment and order details
  const dateOnly = new Date().toISOString().split("T")[0];
  doc.setFont("normal");
  doc.text(`Payment Terms: ${selectedOrder.PaymentTerm}`, 120, 55);
  doc.text(`Paid Through: ${selectedOrder.Type}`, 120, 60);
  doc.text(`Total: ${selectedOrder.TotalOrderPrice}`, 120, 65);
  doc.text(`Order Date: ${dateOnly}`, 120, 70);

  doc.setLineDashPattern([3, 3], 0);
  const width = doc.internal.pageSize.getWidth();
  const middleX = width / 2;
  doc.line(middleX, 50, middleX, 80);

  doc.setLineDashPattern([], 0);
  doc.line(10, 81, 200, 81);

  const tableColumnHeaders = [
    "Sr.No",
    "Products",
    "Variants",
    "Quantity",
    "GST %",
    "Amount (INR)",
  ];
  const tableData = [
    [
      selectedOrder.SlNo,
      selectedOrder.ProductName,
      selectedOrder.Variant,
      selectedOrder.Quantity,
      18,
      selectedOrder.TotalPrice,
    ],
  ];

  doc.setFont("normal");
  doc.autoTable({
    startX: 5,
    startY: 84,
    head: [tableColumnHeaders],
    body: tableData,
    theme: "grid",
    headStyles: { fillColor: [22, 160, 133] },
  });

  const totalAmountInWords = converter.toWords(selectedOrder.TotalOrderPrice);

  doc.line(10, doc.lastAutoTable.finalY + 3, 200, doc.lastAutoTable.finalY + 3);

  doc.setFontSize(12);
  doc.setFont("bold");
  doc.text(
    `Total(in words): ${totalAmountInWords} Only`,
    15,
    doc.lastAutoTable.finalY + 10
  );
  doc.setFontSize(15);
  doc.text(
    `Total Amount: ${selectedOrder.TotalOrderPrice}`,
    150,
    doc.lastAutoTable.finalY + 10
  );

  doc.save(`Invoice_${selectedOrder.SlNo}.pdf`);
};
