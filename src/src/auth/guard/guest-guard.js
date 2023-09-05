// react
import { useCallback, useEffect } from 'react'
//
import PropTypes from 'prop-types'
// routes
import { useRouter } from 'src/routes/hook'
import { paths } from 'src/routes/paths'

//
import { useAuthContext } from '../hooks'

// ----------------------------------------------------------------------

export default function GuestGuard({ children }) {
  const router = useRouter()

  const { authenticated } = useAuthContext()

  const check = useCallback(() => {
    if (authenticated) {
      router.replace(paths.dashboard.root)
    }
  }, [authenticated, router])

  useEffect(() => {
    check()
  }, [check])

  return <>{children}</>
}

GuestGuard.propTypes = {
  children: PropTypes.node,
}
