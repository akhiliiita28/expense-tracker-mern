const Expense = require("../models/Expense");
const { formatExcelDate, createExcelBuffer, sendExcelFile } = require("../utils/excelExport");

exports.addExpense = async (req, res) => {
    try {
        const { icon, category, amount, date } = req.body;

        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields required" });
        }

        const newExpense = await Expense.create({
            userId: req.user.id,
            icon,
            category,
            amount,
            date: new Date(date),
        });

        res.status(200).json({ newExpense });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

exports.getAllExpense = async (req, res) => {
    try {
        const expense = await Expense.find({ userId: req.user.id }).sort({ date: -1 });
        res.json(expense);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

exports.downloadExpenseExcel = async (req, res) => {
    try {
        const rows = (await Expense.find({ userId: req.user.id }).sort({ date: -1 })).map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: formatExcelDate(item.date),
        }));

        const buffer = createExcelBuffer(rows, "expense");
        sendExcelFile(res, buffer, "expense_details.xlsx");
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
