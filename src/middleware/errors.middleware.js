import EErrors from "../errors/enum.js"
import {error} from "console"

export default (error, req, res, next) => {
  console.error(error.cause)
  switch (error.code) {
    case EErrors.INVALID_TYPES_ERROR:
      res.send({ status: 'Error', error: error.name })
      break

    case EErrors.INVALID_ARGUMENT:
      res.send({ status: 'Error', error: error.name })
      break

    default:
      res.send({ status: 'error', error: 'unhandled error' })
  }
}