import moment from 'moment'

export function isSameDay (moment1, moment2) {
  if (moment1 && moment2) {
    return moment1.isSame(moment2, 'day')
  } else {
    return !moment1 && !moment2
  }
}

export function isDayInRange (day, startDate, endDate) {
  const before = startDate.clone().startOf('day').subtract(1, 'seconds')
  const after = endDate.clone().startOf('day').add(1, 'seconds')
  return day.clone().startOf('day').isBetween(before, after)
}

export function isDayDisabled (day, { minDate, maxDate, excludeDates, includeDates, filterDate } = {}) {
  return (minDate && day.isBefore(minDate)) ||
    (maxDate && day.isAfter(maxDate)) ||
    (excludeDates && excludeDates.length > 0 && excludeDates.some(excludeDate => isSameDay(day, excludeDate))) ||
    (includeDates && includeDates.length > 0 && !includeDates.some(includeDate => isSameDay(day, includeDate))) ||
    (filterDate && !filterDate(day.clone())) ||
    false
}

export function allDaysDisabledBefore (day, unit, { minDate, includeDates } = {}) {
  const dateBefore = day.clone().subtract(1, unit)
  return (minDate && dateBefore.isBefore(minDate, unit)) ||
    (includeDates && includeDates.every(includeDate => dateBefore.isBefore(includeDate, unit))) ||
    false
}

export function allDaysDisabledAfter (day, unit, { maxDate, includeDates } = {}) {
  const dateAfter = day.clone().add(1, unit)
  return (maxDate && dateAfter.isAfter(maxDate, unit)) ||
    (includeDates && includeDates.every(includeDate => dateAfter.isAfter(includeDate, unit))) ||
    false
}

export function getEffectiveMinDate ({ minDate, includeDates }) {
  if (includeDates && minDate) {
    return moment.min(includeDates.filter(includeDate => minDate.isSameOrBefore(includeDate, 'day'))).startOf('day')
  } else if (includeDates) {
    return moment.min(includeDates).startOf('day')
  } else {
    return minDate
  }
}

export function getEffectiveMaxDate ({ maxDate, includeDates }) {
  if (includeDates && maxDate) {
    return moment.max(includeDates.filter(includeDate => maxDate.isSameOrAfter(includeDate, 'day'))).startOf('day')
  } else if (includeDates) {
    return moment.max(includeDates).startOf('day')
  } else {
    return maxDate
  }
}
