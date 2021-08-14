import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import Button from '@material-ui/core/Button';
import { jsPDF } from "jspdf";


const styles = StyleSheet.create({
    page: {
        backgroundColor: '#efefef'
    },
    section: {
        border: '1px solid red'
    }
});

const MyDoc = (props) => (
    <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>
                        {props.text}
                    </Text>
                </View>
            </Page>
    </Document>

);




const PdfMaker = (props) => {

    const handleClick = () => {
        const doc = new jsPDF({
            orientation: "landscape",
            unit: "in",
            format: [4, 2]
          });
        
        doc.text(props.text, 1, 1);
        doc.save("two-by-four.pdf");
    }

    return(
    <div>
        <h1>Hello</h1>
       {/* <PDFDownloadLink document={<MyDoc text={props.text} />} filename="testing.pdf">
       {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Download now!'
      }
       </PDFDownloadLink> */}
    <Button variant="contained" onClick={handleClick}>Default</Button>


    </div>
    );
};

export default PdfMaker;