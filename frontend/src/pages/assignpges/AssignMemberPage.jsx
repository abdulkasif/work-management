import React from 'react'
import { useLocation } from 'react-router-dom'

function AssignMemberPage() {
    const location = useLocation();
    const projectDetails = location.state?.project;
  return (
    <div className='text-white text-lg'>{projectDetails._id}</div>
  )
}

export default AssignMemberPage