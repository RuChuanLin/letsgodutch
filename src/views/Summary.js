import { useFormikWizard } from '../components/FormikWizard'
import React from 'react'

function Summary() {
  const { values } = useFormikWizard()

  return (
    <div>
      <h1>Is this information correct?</h1>
      <p>User name: {values.personal.userName}</p>
      <p>Company name: {values.company.companyName}</p>
    </div>
  )
}

export default Summary