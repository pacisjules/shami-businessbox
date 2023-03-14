import React, { useState } from "react";
import { Tooltip } from 'devextreme-react/tooltip';

import { customersdata, states } from "../../app/data/customersdata.js";
import DataGrid, {
  Column,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
  Summary,
  TotalItem,
  Editing,
  HeaderFilter,
  Export,
  Lookup,
  FilterRow,
  Form,
  Popup,
  MasterDetail,
} from "devextreme-react/data-grid";

import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.greenmist.compact.css";

import DetailTemplate from "./DetailTemplate.js";
import { Item } from "devextreme-react/form";

import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { exportDataGrid } from "devextreme/pdf_exporter";
const exportFormats = ["pdf"];

const notesEditorOptions = { height: 100 };

const animationConfig = {
  show: {
    type: 'slide',
    from: {
      top: -100,
      opacity: 0,
    },
    to: {
      top: 0,
      opacity: 1,
    },
  },
  hide: {
    type: 'pop',
    from: {
      scale: 1,
      opacity: 1,
    },
    to: {
      scale: 0.1,
      opacity: 0,
    },
  },
};




const GridPage = () => {
  const onExporting = React.useCallback((e) => {
    const doc = new jsPDF();

    exportDataGrid({
      jsPDFDocument: doc,
      component: e.component,
      indent: 5,
    }).then(() => {
      doc.save("Companies.pdf");
    });
  });
  const pageSizes = [5, 10];

  const makereport = () => {
    let itm = JSON.parse(localStorage.getItem("infos"));
    const doc = new jsPDF({
      unit: "pt", // points, pixels won't work properly
    });

    doc.setFontSize(42);
    doc.setFont("helvetica", "bold");
    doc.setTextColor("#1ba3f7");
    doc.text("Document Report", 120, 50); // X, Y

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor("black");
    doc.text(`Names: ${itm.FirstName} ${itm.LastName}`, 40, 75); // X, Y
    doc.setFont("helvetica", "normal");
    doc.text(`Position: ${itm.Address} Address: ${itm.LastName}`, 40, 95); // X, Y
    // Add a colored rectangle
    doc.setFillColor(0, 179, 36);
    doc.rect(40, 120, 520, 3, "F");
    doc.setFont("helvetica", "normal");
    doc.text(
      `This is the report information: Birth: ${itm.BirthDate} Hired date: ${itm.HireDate} Pre: ${itm.Prefix}.`,
      40,
      110
    );
    doc.setFontSize("10");
    doc.text(`Notes:${itm.Notes}.`, 40, 150);

    doc.autoTable({
      head: [columns.map((column) => column.header)],
      body: data.map((row) => {
        return columns.map((column) => row[column.dataKey]);
      }),
      styles: {
        hLineWidth: 1,
        vLineWidth: 1,
        cellPadding: 5,
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        lineColor: ["#e000ac"],
        lineWidth: 0.2,
      },
      headStyles: {
        fillColor: ["#e000ac"],
        textColor: [255, 255, 255],
        lineColor: ["#e000ac"],
        lineWidth: 0.2,
      },
      bodyStyles: {
        fillColor: [245, 245, 245],
      },
      alternateRowStyles: {
        fillColor: ["#ffc9f3"],
      },
      startY: 190, // sets the starting y coordinate of the table
      margin: { left: 40 }, // sets the left margin of the table
      tableWidth: "auto", // sets the table width to the width of the content
    });

    doc.addImage('download.jpeg', 'JPEG', 40, 350, 150, 150);
    doc.setTextColor("#f500bc");
    doc.textWithLink('Click here to go to Google', 240, 450, { url: 'https://www.google.com' });

    doc.save(`${itm.FirstName}` + ".pdf");
  };

  const data = [
    { name: "John Doe", age: 25 },
    { name: "Jane Doe", age: 30 },
    { name: "Bob Smith", age: 45 },
    { name: "Alice Johnson", age: 35 },
  ];

  const columns = [
    { header: "Name", dataKey: "name" },
    { header: "Age", dataKey: "age" },
  ];

  function generatePDF() {
    const doc = new jsPDF();

    doc.text("List of Users", 10, 10);

    doc.autoTable({
      head: [columns.map((column) => column.header)],
      body: data.map((row) => {
        return columns.map((column) => row[column.dataKey]);
      }),
    });

    doc.save("users.pdf");
  }



  return (
    <center>
      <DataGrid
        id="grid-container"
        dataSource={customersdata}
        keyExpr="ID"
        allowColumnReordering={true}
        rowAlternationEnabled={true}
        onExporting={onExporting}
        onRowRemoved={(e) => {
          alert(e.data.FirstName);
        }}
        width={"85%"}
        style={{
          showBorders: true,
          showTitle: true,
        }}
      >
        <Editing
          mode="popup"
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
        >
          <Popup
            title="Employee Info"
            showTitle={true}
            width={700}
            height={525}
          />

          <Form>
            <Item itemType="group" colCount={2} colSpan={2}>
              <Item dataField="FirstName" />
              <Item dataField="LastName" />
              <Item dataField="Prefix" />
              <Item dataField="BirthDate" />
              <Item dataField="Position" />
              <Item dataField="HireDate" />
              <Item
                dataField="Notes"
                editorType="dxTextArea"
                colSpan={2}
                editorOptions={notesEditorOptions}
              />
            </Item>

            <Item
              itemType="group"
              caption="Home Address"
              colCount={2}
              colSpan={2}
            >
              <Item dataField="StateID" />
              <Item dataField="Address" />
            </Item>
          </Form>
        </Editing>

        <Column dataField="Prefix" caption="Title" width={70} />
        <Column dataField="FirstName" />
        <Column dataField="LastName" />
        <Column dataField="BirthDate" dataType="date" />
        <Column dataField="Position" width={170} />
        <Column dataField="Salary" dataType="number" />
        <Column dataField="HireDate" dataType="date" />
        <Column dataField="StateID" caption="State" width={125}>
          <Lookup dataSource={states} valueExpr="ID" displayExpr="Name" />
        </Column>
        <Column dataField="Address" visible={false} />
        <Column dataField="Notes" visible={false} />

        <Paging defaultPageSize={5} />
        <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />

        <GroupPanel visible={true} />
        <SearchPanel visible={true} highlightCaseSensitive={true} />
        <Grouping autoExpandAll={true} />

        <Export
          enabled={true}
          formats={exportFormats}
          allowExportSelectedData={true}
        />

        <MasterDetail
          enabled={true}
          component={(e) => {
            return (
              <div>
                <h2>Id:{e.data.key}</h2>
                {customersdata
                  .filter((item) => item.ID === e.data.key)
                  .map((itm) => {
                    return (
                      <div
                        style={{
                          backgroundColor:
                            (itm.Salary * 18) / 100 > 15 ? "#d1008f" : "#005bed",
                          color: "white",
                          padding: "10px",
                          borderRadius: "10px",
                        }}
                      >
                        <h3>
                          F: {itm.FirstName} and L: {itm.LastName}
                        </h3>
                        {localStorage.setItem("infos", JSON.stringify(itm))}
                        <p>
                          Tax on Salary {(itm.Salary * 18) / 100} Infos:{" "}
                          {(itm.Salary * 18) / 100 > 20
                            ? "Must take,"
                            : "Not Take,"}{" "}
                          Rwfs Net Salary: {itm.Salary}
                        </p>
                        <button onClick={makereport}>Print</button>
                        <br />
                        <br />
                        <button onClick={generatePDF}>Print2</button>
                      </div>
                    );
                  })}
              </div>
            );
          }}
        />

        <FilterRow visible={true} applyFilter={true} />
        <HeaderFilter visible={true} />

        <Summary>
          <TotalItem column="FirstName" summaryType="count" />

          <TotalItem column="Salary" summaryType="sum" valueFormat="currency" />
        </Summary>
      </DataGrid>

    </center>
  );
};

export default GridPage;
