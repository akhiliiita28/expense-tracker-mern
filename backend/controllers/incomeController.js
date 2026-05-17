const Income = require("../models/Income");
const { formatExcelDate, createExcelBuffer, sendExcelFile } = require("../utils/excelExport");

exports.addIncome = async (req, res) => {
    try {
        const { icon, source, amount, date } = req.body;

        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields required" });
        }

        const newIncome = await Income.create({
            userId: req.user.id,
            icon,
            source,
            amount,
            date: new Date(date),
        });

        res.status(200).json({ newIncome });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

exports.getAllIncome = async (req, res) => {
    try {
        const income = await Income.find({ userId: req.user.id }).sort({ date: -1 });
        res.json(income);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

exports.deleteIncome = async (req, res) => {
    try {
        await Income.findByIdAndDelete(req.params.id);
        res.json({ message: "Income deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

exports.downloadIncomeExcel = async (req, res) => {
    try {
        const rows = (await Income.find({ userId: req.user.id }).sort({ date: -1 })).map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: formatExcelDate(item.date),
        }));

        const buffer = createExcelBuffer(rows, "income");
        sendExcelFile(res, buffer, "income_details.xlsx");
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
