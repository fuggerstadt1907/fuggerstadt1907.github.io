export const isLocalEnvironment = () =>
  window.location.hostname === 'localhost' || window.location.hostname === 'fuggerstadt1907.github.io'

export const objectHasTruthyValuesOnly = (object: { [key: string]: any }) =>
  Object.values(object).every(value => Boolean(value))

export const mapKeyword = (keyword: string) => {
  switch (keyword) {
    case 'Brand':
      return 'B'

    case 'Technische Hilfe':
      return 'T'

    case 'Sicherheitswache':
      return 'W'

    case 'Fehlalarm':
      return 'F'

    case 'Sonstige':
      return 'S'

    case 'alle':
      return 'alle'

    default:
      return 'alle'
  }
}

export const mapKeywordToColorSchema = (keyword: string) => {
  switch (keyword) {
    case 'B':
      return 'brand'

    case 'T':
      return 'thl'

    case 'F':
      return 'fehlalarm'

    default:
      return 'rettungsdienst-sonstige'
  }
}

export const mapKeywordToTextColor = (keyword: string) => {
  switch (keyword) {
    case 'B':
      return 'white'

    case 'T':
      return 'white'

    case 'F':
      return 'white'

    default:
      return 'black'
  }
}
