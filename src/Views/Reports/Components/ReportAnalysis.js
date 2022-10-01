import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { toMoney } from 'helpers'

const COLORS = ['#A259FF', '#F24E1E', '#FFC107', '#6497B1']
const RADIAN = Math.PI / 180

const ReportAnalysis = (props) => {
  const { reportData, type } = props

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <div className="report-container-col analysis-container">
      <div className="label-lists">
        {reportData.reportLists.map((item, i) => (
          <div className="label-item" key={item.projectId}>
            <span style={{ background: COLORS[i] }} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <div className="chart-container" style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={reportData.reportLists}
              innerRadius={80}
              outerRadius={140}
              labelLine={false}
              cx="50%"
              cy="50%"
              fill="#8884d8"
              label={renderCustomizedLabel}
              dataKey="total"
            >
              {reportData.reportLists.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="total-container">
        {type === 'gateway' ? (
          <h3>GATEWAY TOTAL | {toMoney(reportData.total)} USD</h3>
        ) : (
          <h3>PROJECT TOTAL | {toMoney(reportData.total)} USD</h3>
        )}
      </div>
    </div>
  )
}

export default ReportAnalysis
