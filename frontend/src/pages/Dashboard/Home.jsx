import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import InfoCard from '../../components/Cards/InfoCard';
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu'
import { IoMdCard } from 'react-icons/io'
import { addThousandsSeperator } from '../../utils/helper';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions';
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses';
import RecentIncomeWithChart from '../../components/Charts/RecentIncomeWithChart';
import RecentIncome from '../../components/Dashboard/RecentIncome';
const Home = () => {
  useUserAuth();
  const navigate = useNavigate()
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [allExpenses, setAllExpenses] = useState([])
  const [allIncome, setAllIncome] = useState([])
  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true)
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );
      if (response.data) {
        setDashboardData(response.data)
      }



    } catch (error) {
      console.log("Something went wrong. Please try again.", error);

    }
    finally {
      setLoading(false)
    }

  }
  const fetchAllExpenses = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      setAllExpenses(Array.isArray(response.data) ? response.data : [])
    } catch (error) {
      console.log("Something went wrong while fetching expenses.", error);
      setAllExpenses([])
    }
  }

  const fetchAllIncome = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      setAllIncome(Array.isArray(response.data) ? response.data : [])
    } catch (error) {
      console.log("Something went wrong while fetching income.", error);
      setAllIncome([])
    }
  }

  useEffect(() => {
    fetchDashboardData()
    fetchAllExpenses()
    fetchAllIncome()
    return () => { }
  }, [])

  const last30DayExpenseTransactions = dashboardData?.last30DaysExpenses?.transactions || []
  const expenseTransactions = last30DayExpenseTransactions.length > 0 ? last30DayExpenseTransactions : allExpenses
  const showExpenseChartFallback = last30DayExpenseTransactions.length === 0 && allExpenses.length > 0
  const expenseChartData = showExpenseChartFallback ? allExpenses.slice(0, 30) : last30DayExpenseTransactions
  const last60DayIncomeTransactions = dashboardData?.last60DaysIncome?.transactions || []
  const incomeChartData = last60DayIncomeTransactions.length > 0 ? last60DayIncomeTransactions.slice(0, 4) : allIncome.slice(0, 4)
  const recentIncomeData = last60DayIncomeTransactions.length > 0 ? last60DayIncomeTransactions : allIncome
  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>

          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeperator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />

          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandsSeperator(dashboardData?.totalIncome || 0)}
            color="bg-orange-500"
          />

          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandsSeperator(dashboardData?.totalExpenses || 0)}
            color="bg-red-500"
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => { navigate("/expense") }}
          />

          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpenses={dashboardData?.totalExpenses || 0}
          />

          <ExpenseTransactions
            transactions={expenseTransactions}

            onSeeMore={() => navigate("/expense")}
          />
          <Last30DaysExpenses
            data={expenseChartData}
            isFallback={showExpenseChartFallback}
          />

          <RecentIncomeWithChart
            data={incomeChartData}
            totalIncome={dashboardData?.totalIncome || 0}
          />

          <RecentIncome
            transactions={recentIncomeData}
            onSeeMore={() => navigate("/income")}
          />
        </div>


      </div>

    </DashboardLayout>
  )
}

export default Home
