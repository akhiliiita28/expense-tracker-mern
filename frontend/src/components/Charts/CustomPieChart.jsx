import React from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'
import CustomTooltip from './CustomTooltip'
import CustomLegend from './CustomLegend'
const CustomPieChart = ({
  data = [],
  label,
  totalAmount,
  colors = [],
  showTextAnchor }) => {
  const labelColor = "var(--chart-label)";
  const valueColor = "var(--chart-value)";

  return <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={data}
        dataKey="amount"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={100}
        outerRadius={130}
        labelLine={false}
      // label={renderCustomizedLabel}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip content={CustomTooltip} />
      <Legend content={CustomLegend} />
      {showTextAnchor && (
        <>
          <text
            x="50%"
            y="50%"
            dy={-25}
            textAnchor="middle"
            fill={labelColor}
            fontSize="14px"
          >
            {label}
          </text>
          <text
            x="50%"
            y="50%"
            dy={8}
            textAnchor="middle"
            fill={valueColor}
            fontSize="24px"
            fontWeight="semi-bold"
          >{totalAmount}
          </text>

        </>

      )

      }
    </PieChart>
  </ResponsiveContainer >
}

export default CustomPieChart
