import type { TimelinePeriod } from './timeline'

export function formatYearRange(period: TimelinePeriod): string {
  const start = Math.abs(period.startYear)
  const end = Math.abs(period.endYear)
  const startSuffix = period.startYearLabel
  const endSuffix = period.endYearLabel

  if (startSuffix === endSuffix) {
    return `${start}–${end} ${startSuffix}`
  }
  return `${start} ${startSuffix} – ${end} ${endSuffix}`
}
