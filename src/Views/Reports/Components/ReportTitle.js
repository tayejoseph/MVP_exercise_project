import React from 'react'

const ReportTitle = (props) => {
  const { reportData, projectLists, gateWayLists } = props

  const renderTitleLabel = () => {
    let projectTitle = ''
    let gatewayTitle = ''

    if (reportData.activeProject === 'all') {
      projectTitle = 'All project'
    } else {
      projectTitle = projectLists.find(
        (data) => data.projectId === reportData.activeProject,
      )?.name
    }

    if (reportData.activeGateWay === 'all') {
      gatewayTitle = 'All gateways'
    } else {
      gatewayTitle = gateWayLists.find(
        (data) => data.gatewayId === reportData.activeGateWay,
      )?.name
    }

    return (
      <h1>
        {projectTitle} | {gatewayTitle}
      </h1>
    )
  }

  return <>{renderTitleLabel()}</>
}

export default ReportTitle
