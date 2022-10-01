import React, { useCallback, useEffect, useState } from 'react'
import { axios } from 'lib'
import Container from './Report.styles'
import { toMoney } from 'helpers'
import moment from 'moment'
import { Spinner } from 'UI'
import ReportAnalysis from './Components/ReportAnalysis'
import ReportFilter from './Components/ReportFilter'
import ReportTitle from './Components/ReportTitle'
import EmptyReport from './Components/EmptyReport'

const initfilterData = {
  gatewayId: '',
  projectId: '',
  from: '2021-01-01',
  to: '2021-12-31',
}

const validateReportQuery = (filterData) => {
  const { projectId, gatewayId } = filterData

  if (!projectId && !gatewayId)
    return 'You need to select a project and gateway before a report can be generated'
  else if (!projectId)
    return 'You need to select a project before a report can be generated'
  else if (!gatewayId)
    return 'You need to select a gateway before the report can be generated'
}

const Reports = () => {
  const [{ gateWayLists, projectLists }, setApiData] = useState({
    gateWayLists: null,
    projectLists: null,
    userLists: null,
  })

  const [loading, setLoading] = useState(false)
  const [activeProjectKey, setActiveProjectKey] = useState('')

  const [filterData, setFilterData] = useState(initfilterData)
  const [reportData, setReportData] = useState({
    errorMessage: '',
    activeProject: '',
    activeGateWay: '',
    total: 0,
    reportLists: null,
  })

  const handleInput = ({ target: { value, name } }) => {
    if (reportData.errorMessage)
      setReportData((s) => ({
        ...s,
        errorMessage: '',
      }))
    setFilterData((s) => ({
      ...s,
      [name]: value,
    }))
  }

  const initiateApi = async () => {
    const getProjectLists = () => axios.get('/projects')
    const getGateWay = () => axios.get('/gateways')

    Promise.all([getProjectLists(), getGateWay()]).then((results) => {
      const [projectData, gateWayData] = results
      setApiData({
        gateWayLists: gateWayData?.data?.data || [],
        projectLists: projectData?.data?.data || [],
      })
    })
  }

  const handleGenerateReport = useCallback(
    (filterData) => {
      const getReport = async () => {
        const { gatewayId, projectId, from, to } = filterData

        let errorMessage = validateReportQuery(filterData)

        if (!moment(from).isBefore(to)) {
          errorMessage = 'Your start date should be before the end date'
        }

        if (errorMessage) {
          setReportData((s) => ({
            ...s,
            errorMessage,
          }))
          return
        }

        setLoading(true)

        const { data: response } = await axios.post('/report', {
          ...filterData,
          projectId: projectId === 'all' ? '' : projectId,
          gatewayId: gatewayId === 'all' ? '' : gatewayId,
        })

        setLoading(false)
        let total = 0
        const formatedData = {}
        response.data.forEach((item) => {
          total += item.amount
          if (projectId === 'all') {
            formatedData[item.projectId] = {
              ...(formatedData[item.projectId] || {}),
              transactionsLists: [
                ...(formatedData[item.projectId]?.transactionsLists || []),
                {
                  ...item,
                  gateWayData: gateWayLists.find(
                    (data) => data.gatewayId === item.gatewayId,
                  ),
                },
              ],
              total: (formatedData[item.projectId]?.total || 0) + item.amount,
            }
            if (!formatedData[item.projectId]?.name) {
              formatedData[item.projectId] = {
                ...formatedData[item.projectId],
                ...(projectLists.find(
                  (data) => data.projectId === item.projectId,
                ) || {}),
              }
            }
          } else if (gatewayId === 'all') {
            formatedData[item.gatewayId] = {
              ...(formatedData[item.gatewayId] || {}),
              transactionsLists: [
                ...(formatedData[item.gatewayId]?.transactionsLists || []),
                item,
              ],
              total: (formatedData[item.gatewayId]?.total || 0) + item.amount,
            }
            if (!formatedData[item.gatewayId]?.name) {
              formatedData[item.gatewayId] = {
                ...formatedData[item.gatewayId],
                ...(gateWayLists.find(
                  (data) => data.gatewayId === item.gatewayId,
                ) || {}),
              }
            }
          } else {
            formatedData[item.projectId] = {
              ...(formatedData[item.projectId] || {}),
              transactionsLists: [
                ...(formatedData[item.projectId]?.transactionsLists || []),
                item,
              ],
              total: (formatedData[item.projectId]?.total || 0) + item.amount,
            }
            if (!formatedData[item.projectId]?.name) {
              formatedData[item.projectId] = {
                ...formatedData[item.projectId],
                ...(projectLists.find(
                  (data) => data.projectId === item.projectId,
                ) || {}),
                ...(projectLists.find(
                  (data) => data.projectId === item.projectId,
                ) || {}),
              }
            }
          }
        })

        const reportLists = Object.values(formatedData).sort((a, b) =>
          a.name > b.name ? 1 : -1,
        )

        setReportData({
          activeProject: projectId,
          total,
          activeGateWay: gatewayId,
          reportLists,
        })

        setActiveProjectKey(
          reportLists[0]?.projectId || reportLists[0]?.gatewayId,
        )
      }
      getReport()
    },
    [projectLists, gateWayLists],
  )

  useEffect(() => {
    initiateApi()
  }, [])

  const renderLists = (data) => {
    const { total, projectId, gatewayId, name, transactionsLists } = data
    const uniqueKey = projectId || gatewayId
    const showShowLabel =
      reportData.activeProject !== 'all' && reportData.activeGateWay !== 'all'
    const showGateWay =
      reportData.activeGateWay === 'all' && reportData.activeProject === 'all'

    return (
      <>
        <div
          className="project-item"
          key={uniqueKey}
          style={{ display: showShowLabel ? 'none' : 'flex' }}
          onClick={() => {
            setActiveProjectKey((s) => (s === uniqueKey ? null : uniqueKey))
          }}
        >
          <h3>{name}</h3>
          <h3>TOTAL: {total} USD</h3>
        </div>
        {transactionsLists && activeProjectKey === uniqueKey ? (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  {showGateWay && <th>Gateway</th>}
                  <th>Transaction ID</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactionsLists.map((item) => (
                  <tr key={item.paymentId}>
                    <td>{item.modified}</td>
                    {showGateWay && <td>{item?.gateWayData?.name}</td>}
                    <td>{item.paymentId}</td>
                    <td>{toMoney(item.amount)} USD</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </>
    )
  }

  return (
    <Container>
      <header>
        <div className="col-1">
          <h1>Reports</h1>
          <p>Easily generate a report of your transactions</p>
          <p className="error-msg">{reportData.errorMessage}</p>
        </div>
        <div className="col-2">
          <ReportFilter
            {...{
              filterData,
              handleInput,
              projectLists,
              gateWayLists,
              handleGenerateReport,
            }}
          />
        </div>
      </header>
      {loading ? (
        <div className="loading-container">
          <Spinner size={'55px'} />
        </div>
      ) : (
        <>
          {!reportData.reportLists ? (
            <EmptyReport />
          ) : (
            <div className="report-row">
              <div className="report-container-col">
                <div className="report-content">
                  <div>
                    <div className="report-col_1">
                      <ReportTitle
                        {...{ reportData, projectLists, gateWayLists }}
                      />
                    </div>
                    <div className="report-col_2"></div>
                  </div>
                  <div className="project-lists">
                    {reportData.reportLists && (
                      <>
                        {reportData.reportLists.length > 0 ? (
                          reportData.reportLists.map((item) =>
                            renderLists(item),
                          )
                        ) : (
                          <EmptyReport />
                        )}
                      </>
                    )}
                  </div>
                </div>
                {((reportData.activeProject === 'all' &&
                  reportData.activeGateWay === 'all') ||
                  (reportData.activeProject !== 'all' &&
                    reportData.activeGateWay !== 'all')) && (
                  <div className="total-container">
                    <h3>TOTAL: {toMoney(reportData.total)} USD</h3>
                  </div>
                )}
              </div>
              {reportData.activeProject === 'all' &&
                reportData.activeGateWay !== 'all' && (
                  <ReportAnalysis {...{ type: 'gateway', reportData }} />
                )}
              {reportData.activeProject !== 'all' &&
                reportData.activeGateWay === 'all' && (
                  <ReportAnalysis {...{ type: 'project', reportData }} />
                )}{' '}
            </div>
          )}
        </>
      )}
    </Container>
  )
}

export default Reports
