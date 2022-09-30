import React, { useEffect, useCallback, useState } from 'react'
import { axios } from 'lib'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts'
import Container from './Report.styles'
import { toMoney } from 'helpers'
import { InputGroup, Button } from 'UI'

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
]
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const Reports = () => {
  const [getWayLists, setGateWayLists] = useState(null)
  const [projectLists, setProjectLists] = useState(null)
  const [total, setTotal] = useState(0)
  const [tableLists, setTableLists] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeProjectKey, setActiveProjectKey] = useState('')
  const [formData, setFormData] = useState({
    gatewayId: '',
    projectId: '',
    from: '2021-01-01',
    to: '2021-12-31',
  })

  const handleInput = ({ target: { value, name } }) => {
    setFormData((s) => ({
      ...s,
      [name]: value,
    }))
  }

  const handleGetProjectLists = async () => {
    const { data: response } = await axios.get('/projects')
    if (response.code === '200') {
      setProjectLists(response.data)
    }
  }

  const handleGetGateWay = async () => {
    const { data: response } = await axios.get('/gateways')

    if (response.code === '200') {
      setGateWayLists(response.data)
    }
  }

  const handleGenerateReport = useCallback(() => {
    const getReport = async () => {
      setLoading(true)
      const { data: response } = await axios.post('/report', formData)
      setLoading(false)
      let total = 0
      const formatedData = {}
      response.data.map((item) => {
        const gateWayData =
          getWayLists.find((data) => data.gatewayId === item.gatewayId) || {}
        total += item.amount

        if (formData.projectId && !formData.gatewayId) {
          if (formatedData[item.gatewayId]?.gateWays) {
            formatedData[item.gatewayId] = {
              ...gateWayData,
              gateWays: [...formatedData[item.gatewayId].gateWays, item],
              total: formatedData[item.gatewayId].total + item.amount,
            }
          } else {
            formatedData[item.gatewayId] = {
              ...gateWayData,
              total: item.amount,
              gateWays: [item],
            }
          }
        } else {
          if (formatedData[item.projectId]) {
            formatedData[item.projectId].total =
              formatedData[item.projectId].total + item.amount
            formatedData[item.projectId].transactions = [
              ...formatedData[item.projectId].transactions,
              { ...item, gateWayData },
            ]
          } else {
            formatedData[item.projectId] = {
              total: item.amount,
              transactions: [{ ...item, gateWayData }],
              projectId: item.projectId,
              name:
                projectLists.find((data) => data.projectId === item.projectId)
                  ?.name || '',
            }
          }
        }
      })

      setTableLists(
        Object.values(formatedData).sort((a, b) => (a.name > b.name ? 1 : -1)),
      )
      setTotal(total)
      setActiveProjectKey(Object.keys(formatedData)[0])
    }
    getReport()
  }, [formData, projectLists, getWayLists])

  useEffect(() => {
    handleGetProjectLists()
    handleGetGateWay()
  }, [])

  useEffect(() => {
    handleGenerateReport()
  }, [handleGenerateReport])

  const renderLists = (data) => {
    const { total, projectId, gatewayId, name, transactions, gateWays } = data
    const listData = transactions || gateWays
    const uniqueKey = gateWays ? gatewayId : projectId

    return (
      <>
        <div
          className="project-item"
          key={uniqueKey}
          onClick={() => {
            setActiveProjectKey((s) => (s === uniqueKey ? null : uniqueKey))
          }}
        >
          <h3>{name}</h3>
          <h3>TOTAL: {total} USD</h3>
        </div>
        {listData && activeProjectKey === uniqueKey ? (
          <>
            <table>
              <tr>
                <th>Date</th>
                {!formData.gatewayId && !gateWays && <th>Gateway</th>}
                <th>Transaction ID</th>
                <th>Amount</th>
              </tr>
              <tbody>
                {listData.map((item) => (
                  <tr key={item.paymentId}>
                    <td>{item.modified}</td>
                    {!formData.gatewayId && !gateWays && (
                      <td>{item?.gateWayData?.name}</td>
                    )}
                    <td>{item.paymentId}</td>
                    <td>{toMoney(item.amount)} USD</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : null}
      </>
    )
  }

  const renderTitleLabel = () => {
    let projectTitle = ''
    let gatewayTitle = ''

    if (!formData.projectId) {
      projectTitle = 'All project'
    } else {
      projectTitle = projectLists.find(
        (data) => data.projectId === formData.projectId,
      )?.name
    }

    if (!formData.gatewayId) {
      gatewayTitle = 'All gateways'
    } else {
      gatewayTitle = getWayLists.find(
        (data) => data.gatewayId === formData.gatewayId,
      )?.name
    }

    return (
      <h1>
        {projectTitle} | {gatewayTitle}
      </h1>
    )
  }

  const renderAnalysis = (type) => {
    return (
      <div className="report-container-col analysis-container">
        <div className="label-lists">
          {tableLists.map((item, i) => (
            <div className="label-item" key={item.projectId}>
              <span style={{ background: COLORS[i] }} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
        <div className="chart-container" style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <PieChart onMouseEnter={console.log}>
              <Pie
                data={tableLists}
                innerRadius={80}
                outerRadius={140}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="total"
              >
                {data.map((entry, index) => (
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
            <h3>GATEWAY TOTAL | {toMoney(total)} USD</h3>
          ) : (
            <h3>PROJECT TOTAL | {toMoney(total)} USD</h3>
          )}
        </div>
      </div>
    )
  }
  return (
    <Container>
      <header>
        <div className="col-1">
          <h1>Reports</h1>
          <p>Easily generate a report of your transactions</p>
        </div>
        <div className="col-2">
          <InputGroup
            type="select"
            name="projectId"
            value={formData.projectId}
            onChange={handleInput}
            optionLists={
              <>
                <option value={''}>All</option>
                {projectLists
                  ? projectLists.map((item) => (
                      <option value={item.projectId}>{item.name}</option>
                    ))
                  : null}
              </>
            }
          />
          <InputGroup
            type="select"
            name="gatewayId"
            className="gateway-item"
            value={formData.gatewayId}
            optionLists={
              <>
                <option value={''}>All</option>
                {getWayLists
                  ? getWayLists.map((item) => (
                      <option value={item.gatewayId}>{item.name}</option>
                    ))
                  : null}
              </>
            }
            onChange={handleInput}
          />
          <InputGroup
            type="date"
            value={formData.from}
            onChange={handleInput}
            min="2021-01-01"
            max="2021/12/31"
            name="from"
          />
          <InputGroup
            type="date"
            value={formData.to}
            onChange={handleInput}
            name="to"
          />
          <Button loading={loading} onClick={handleGenerateReport}>
            Generate Report
          </Button>
        </div>
      </header>
      <div className="report-row">
        <div className="report-container-col">
          <div className="report-content">
            <div>
              <div className="report-col_1">{renderTitleLabel()}</div>
              <div className="report-col_2"></div>
            </div>
            <div className="project-lists">
              {tableLists ? (
                <>
                  {tableLists.length > 0 ? (
                    tableLists.map((item) => renderLists(item))
                  ) : (
                    <h1>Empty</h1>
                  )}
                </>
              ) : (
                <h1>Loading</h1>
              )}
            </div>
          </div>
          <div className="total-container">
            <h3>TOTAL: {toMoney(total)} USD</h3>
          </div>
        </div>

        {!formData.projectId && formData.gatewayId && renderAnalysis('gateway')}
        {formData.projectId && !formData.gatewayId && renderAnalysis('project')}
      </div>
    </Container>
  )
}

export default Reports
