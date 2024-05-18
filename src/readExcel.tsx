import React, { useState } from "react";
import { Upload, Button, Table } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";

interface DataType {
  [key: string]: string | number;
  key: number;
}

const ExcelUpload: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [columns, setColumns] = useState<any[]>([]);

  const handleUpload = (file: any) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData: any[][] = XLSX.utils.sheet_to_json(firstSheet, {
        header: 1,
      });

      const headers = jsonData[0] as string[];
      const rows = jsonData.slice(1);

      const tableColumns = headers.map((header: string) => ({
        title: header,
        dataIndex: header,
        key: header,
      }));

      const tableData = rows.map((row: any[], index: number) => {
        const rowData: DataType = { key: index };
        headers.forEach((header, i) => {
          rowData[header] = row[i];
        });
        return rowData;
      });

      setColumns(tableColumns);
      setData(tableData);
    };
    reader.readAsArrayBuffer(file);
    return false;
  };

  return (
    <div>
      <Upload beforeUpload={handleUpload} showUploadList={false}>
        <Button icon={<UploadOutlined />}>Upload Excel</Button>
      </Upload>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default ExcelUpload;
