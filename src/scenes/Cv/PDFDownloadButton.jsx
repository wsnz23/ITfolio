// PDFDownloadButton.jsx

import React from 'react';
import { PDFDownloadLink, Document, Page, Text, StyleSheet } from '@react-pdf/renderer';

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Define the PDF component
const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.section}>Full Name: {data.fullName}</Text>
      <Text style={styles.section}>Email: {data.email}</Text>
      <Text style={styles.section}>Phone Number: {data.phoneNumber}</Text>
      {/* Add more sections as needed */}
    </Page>
  </Document>
);

// Define the PDFDownloadButton component
const PDFDownloadButton = ({ data }) => (
  <PDFDownloadLink document={<MyDocument data={data} />} fileName="resume.pdf">
    {({ blob, url, loading, error }) =>
      loading ? 'Loading document...' : 'Download PDF'
    }
  </PDFDownloadLink>
);

export default PDFDownloadButton;
