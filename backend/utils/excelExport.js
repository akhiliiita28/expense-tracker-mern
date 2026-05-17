const xlsx = require("xlsx");

const formatExcelDate = (value) => {
    if (!value) return "";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
};

const createExcelBuffer = (rows, sheetName) => {
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(rows);

    worksheet["!cols"] = [
        { wch: 24 },
        { wch: 14 },
        { wch: 16 },
    ];

    xlsx.utils.book_append_sheet(workbook, worksheet, sheetName);

    return xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });
};

const sendExcelFile = (res, buffer, fileName) => {
    res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.send(buffer);
};

module.exports = {
    formatExcelDate,
    createExcelBuffer,
    sendExcelFile,
};
