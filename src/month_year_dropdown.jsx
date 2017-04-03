import React from 'react'
import moment from 'moment'

var MonthYearDropdown = React.createClass({
  displayName: 'MonthYearDropdown',

  propTypes: {
    date: React.PropTypes.object,
    locale: React.PropTypes.string,
    maxDate: React.PropTypes.object.isRequired,
    minDate: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  renderSelectOptions () {
    const localeData = moment.localeData(this.props.locale)
    let dates = []

    const currDate = this.props.minDate.clone().startOf('month')
    const lastDate = this.props.maxDate.clone().startOf('month')

    while (currDate.diff(lastDate) <= 0) {
      dates.push(currDate.clone().toDate())
      currDate.add(1, 'months')
    }

    return dates.map((m, i) => (
      <option key={i} value={moment(m).format('YYYY-MM-DD')}>{localeData.months(moment(m))} {moment(m).format('YYYY')}</option>
    ))
  },

  onChange (dateString) {
    if (!this.props.date.clone().startOf('month').isSame(dateString)) {
      this.props.onChange(moment(dateString))
    }
  },

  render () {
    return (
      <div className={`react-datepicker__month-year-dropdown-container`}>
        <select
            value={this.props.date.format('YYYY-MM-DD')}
            className="react-datepicker__month-year-select"
            onChange={e => this.onChange(e.target.value)} >
            {this.renderSelectOptions()}
        </select>
      </div>
    )
  }
})

module.exports = MonthYearDropdown
