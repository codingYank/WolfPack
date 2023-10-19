import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

const ValidatedRoute = () => {
  const { userInfo } = useSelector(state => state.auth)

  return userInfo.emailVerified ? <Outlet /> : <Navigate to={`/verify/${userInfo._id}`} replace />
}

export default ValidatedRoute