import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByCoverage from '../VaccinationCoverage'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {appStatus: apiConstants.initial, resultData: {}}

  componentDidMount() {
    this.getVaccineDetails()
  }

  getVaccineDetails = async () => {
    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')

    if (response.ok) {
      const data = await response.json()
      const requiredData = {
        last7DaysVaccination: data.last_7_days_vaccination,
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }
      const {last7DaysVaccination} = requiredData
      const formattedData = last7DaysVaccination.map(item => ({
        vaccineDate: item.vaccine_date,
        dose1: item.dose_1,
        dose2: item.dose_2,
      }))
      requiredData.last7DaysVaccination = [...formattedData]
      this.setState({appStatus: apiConstants.success, resultData: requiredData})
    } else {
      this.setState({appStatus: apiConstants.failure})
    }
  }

  successView = () => {
    const {resultData} = this.state
    return (
      <>
        <VaccinationByCoverage resultObject={resultData} />
        <VaccinationByGender resultObject={resultData} />
        <VaccinationByAge resultObject={resultData} />
      </>
    )
  }

  failureView = () => {
    console.log('Failure view')

    return (
      <div className="failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
          className="failure-image"
        />
        <h1 className="failure-heading">Something went wrong</h1>
      </div>
    )
  }

  renderContent = () => {
    const {appStatus} = this.state
    console.log(appStatus)
    switch (appStatus) {
      case apiConstants.success:
        return this.successView()
      case apiConstants.failure:
        return this.failureView()
      case apiConstants.initial:
        return (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
          </div>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-container">
        <div className="heading-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="logo-image"
          />
          <h1 className="website-name">Co-WIN</h1>
        </div>
        <h1 className="title">CoWIN Vaccination In India</h1>
        {this.renderContent()}
      </div>
    )
  }
}

export default CowinDashboard
