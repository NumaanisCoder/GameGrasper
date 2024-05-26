import ExcelJS from 'exceljs';
import ConnectDb from "@/middleware/mongoose";
import { Blog } from "@/models/Blog";
import { formatDistanceToNow, format } from 'date-fns';

async function handler(req, res) {
  try {
    const workbook = new ExcelJS.Workbook();
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'dd-MM-yyyy');
    const worksheet = workbook.addWorksheet(`BlogReport_${formattedDate}`);

    // Fetch blogs from the database
    const blogs = await Blog.find({}).sort({ _id: -1 });

    // Add headers to the worksheet
    worksheet.mergeCells('A1:C1');
    const headingCell = worksheet.getCell('A1');
    headingCell.value = `Date: ${formattedDate}`;
    headingCell.font = { bold: true, size: 16 };
    headingCell.alignment = { horizontal: 'center' };

    // Add 5 empty rows after the header

    // Define columns after empty rows
    worksheet.columns = [
        {},
        {},
        {},
      { header: 'Blog_Name', key: 'title', width: 50, bold:true },
      { header: 'Views', key: 'views', width: 10 ,bold:true },
      { header: 'Published', key: 'createdAt', width: 20,bold:true },
    ];
    worksheet.getCell("D1").font = {bold: true , size: 14}
    worksheet.getCell("E1").font = {bold: true, size:14}
    worksheet.getCell("F1").font = {bold: true, size:14}
    worksheet.getColumn('E').font = {bold: true}
    worksheet.getColumn('E').alignment =  { horizontal: 'center' };

    // Calculate the starting row for adding data
    const startDataRow = 2; // header (1 row) + empty rows (5 rows) + 1

    // Add blog data starting from the calculated row
    blogs.forEach((blog, index) => {
      const publishedDate = format(blog.createdAt, 'dd-MM-yyyy');
      const rowData = ["","","",blog.title, blog.views, publishedDate];
      worksheet.addRow(rowData, `A${startDataRow + index}`);
    });

    // Save the workbook to a buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Set headers for file download
    res.setHeader('Content-Disposition', `attachment; filename=Blog_Report_${formattedDate}.xlsx`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.status(200).send(buffer);
  } catch (error) {
    console.error('Error generating Excel:', error);
    res.status(500).send('Error generating Excel');
  }
}

export default ConnectDb(handler);
