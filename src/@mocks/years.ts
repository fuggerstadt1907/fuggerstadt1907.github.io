import dayjs from 'dayjs'

export const years = [
  dayjs().year().toString(),
  dayjs().subtract(1, 'year').year().toString(),
  dayjs().subtract(2, 'year').year().toString(),
  dayjs().subtract(3, 'year').year().toString(),
  dayjs().subtract(4, 'year').year().toString(),
  dayjs().subtract(5, 'year').year().toString(),
]
