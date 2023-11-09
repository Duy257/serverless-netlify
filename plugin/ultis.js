const parseStringDataReturn = ({ code, data }) => {
  return {
    statusCode: code,
    body: JSON.stringify(data)
  }
}

export { parseStringDataReturn }