type LogType = {
  _id: string
  timestamp: string
  level: string
  message: string
  meta: any // You can replace 'any' with the specific type of your meta data
}

export default LogType
