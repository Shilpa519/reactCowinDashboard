import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {resultObject} = props
  const {last7DaysVaccination} = resultObject

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <>
      <h1 className="heading">Vaccination Coverage</h1>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={last7DaysVaccination}
          margin={{top: 5}}
          width={1000}
          height={300}
        >
          <XAxis
            dataKey="vaccineDate"
            tick={{stroke: 'gray', strokeWidth: 0}}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{stroke: 'gray', strokeWidth: 0}}
          />
          <Legend wrapperStyle={{padding: 30}} />
          <Bar
            dataKey="dose1"
            name="Dose1"
            fill="#5a8dee"
            radius={[10, 10, 0, 0]}
            barSize="20%"
          />
          <Bar
            dataKey="dose2"
            name="Dose2"
            fill="#f54394"
            radius={[10, 10, 0, 0]}
            barSize="20%"
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

export default VaccinationCoverage
