import React from 'react';
import style from "./ExcelButton.module.css"

export default function ExcelButton() {
  const downloadExcel = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/util/getExcel`);
    
    if (response.ok) {
      const blob = await response.blob();

      // Generate a filename based on the current date (DD-MM)
      const currentDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' }).replace(/\//g, '-');
      const filename = `Blog_Report_${currentDate}.xlsx`;

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      console.error('Error generating or downloading Excel file');
    }
  };

  return (
    <div>
      <button className={style.btn} onClick={downloadExcel}>Download Today Report</button>
    </div>
  );
}
