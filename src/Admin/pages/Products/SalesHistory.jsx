import React from "react";
import { Box, Button, Typography } from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";

const SalesHistory = () => {
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
    const rightColumnX = 145; // Starting position for the right column
    doc.text("INVOICE", rightColumnX, 20);
    doc.text("INVOICE: 00012", rightColumnX, 30);
    doc.text("DATE: 1/30/23", rightColumnX, 40);

    // doc.text("FOR:", rightColumnX, 60);
    // doc.text("Consultation services", rightColumnX, 70);

    doc.text("FOR:", rightColumnX, 90); // Increased from 60 to 80
    doc.text("Consultation services", rightColumnX, 100); // Increased from 70 to 90

    // Services Table
    const tableData = [["Consultation services", "3.0", "$375.00", "$1125.00"]];
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
    doc.text("$1125.00", 180, finalY + 20, null, null, "right");

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
    <Box sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Generate Invoice
      </Typography>
      <Button variant="contained" color="primary" onClick={generateInvoicePDF}>
        Download Invoice PDF
      </Button>
    </Box>
  );
};

export default SalesHistory;
