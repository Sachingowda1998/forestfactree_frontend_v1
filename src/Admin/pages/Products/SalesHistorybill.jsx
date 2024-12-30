import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const SalesHistroyBill = () => {
  const [items, setItems] = useState([]);
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState("");
  const [rate, setRate] = useState("");

  const addItem = () => {
    if (description && hours && rate) {
      const amount = (parseFloat(hours) * parseFloat(rate)).toFixed(2);
      const newItem = [description, hours, `$${rate}`, `$${amount}`];
      setItems([...items, newItem]);
      setDescription("");
      setHours("");
      setRate("");
    }
  };

  const calculateTotal = () => {
    return items
      .reduce((total, item) => total + parseFloat(item[3].slice(1)), 0)
      .toFixed(2);
  };

  const generateInvoicePDF = () => {
    const doc = new jsPDF();

    // Left Column: Contact Details
    doc.setFontSize(12);
    doc.text("Timber Trading", 14, 20);
    doc.text("Experts in earning trusts", 14, 30);
    doc.text("450 East 78th Ave", 14, 40);
    doc.text("Denver, CO 12345", 14, 50);
    doc.text("Phone: (123) 456-7890", 14, 60);
    doc.text("Fax: (123) 456-7891", 14, 70);

    doc.text("TO:", 14, 90);
    doc.text("Gaurav Cheema", 14, 100);
    doc.text("Caneiro Group", 14, 110);
    doc.text("89 Pacific Ave", 14, 120);
    doc.text("San Francisco, CA 78910", 14, 130);

    // Right Column: Invoice Details
    const rightColumnX = 145;
    doc.text("INVOICE", rightColumnX, 20);
    doc.text("INVOICE: 00012", rightColumnX, 30);
    doc.text("DATE: 1/30/23", rightColumnX, 40);

    doc.text("FOR:", rightColumnX, 90);
    doc.text("Consultation services", rightColumnX, 100);

    // Services Table
    const tableData = items;
    doc.autoTable({
      startY: 150,
      head: [["DESCRIPTION", "HOURS", "RATE", "AMOUNT"]],
      body: tableData,
      theme: "grid",
      styles: { halign: "center" },
      headStyles: { fillColor: [200, 200, 200] },
    });

    // Total Section
    const finalY = doc.lastAutoTable.finalY || 150;
    doc.setFontSize(12);
    doc.text("TOTAL:", 150, finalY + 20);
    doc.text(`$${calculateTotal()}`, 180, finalY + 20, null, null, "right");

    // Footer
    doc.setFontSize(10);
    doc.text(
      "Make all checks payable to Market Financial Consulting",
      105,
      finalY + 40,
      null,
      null,
      "center"
    );
    doc.text(
      "Total due in 15 days. Overdue accounts subject to a service charge of 1% per month.",
      105,
      finalY + 50,
      null,
      null,
      "center"
    );
    doc.text(
      "Thank you for your business!",
      105,
      finalY + 60,
      null,
      null,
      "center"
    );

    // Save PDF
    doc.save("invoice.pdf");
  };

  return (
    <div className="container text-center mt-5">
      <h5>Generate Invoice</h5>
      <div className="mb-3">
        <input
          className="form-control mb-2"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="form-control mb-2"
          type="number"
          placeholder="Hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />
        <input
          className="form-control mb-2"
          type="number"
          placeholder="Rate"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addItem}>
          Add Item
        </button>
      </div>

      <button className="btn btn-primary" onClick={generateInvoicePDF}>
        Download Invoice PDF
      </button>
    </div>
  );
};

export default SalesHistroyBill;
