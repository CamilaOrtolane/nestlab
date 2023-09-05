// react
import { useCallback, useEffect, useState } from 'react'
//
import PropTypes from 'prop-types'
// routes
import { useRouter } from 'src/routes/hook'
import { paths } from 'src/routes/paths'

//
import { useAuthContext } from '../hooks'

// ----------------------------------------------------------------------

const loginPaths = {
  jwt: paths.auth.jwt.login,
}

// ----------------------------------------------------------------------

export default function AuthGuard({ children }) {
  const router = useRouter()

  const { authenticated, method } = useAuthContext()

  const [checked, setChecked] = useState(false)

  const check = useCallback(() => {
    if (!authenticated) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.href,
      }).toString()

      const loginPath = loginPaths[method]

      const href = `${loginPath}?${searchParams}`

      router.replace(href)
    } else {
      setChecked(true)
    }
  }, [authenticated, method, router])

  useEffect(() => {
    check()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!checked) {
    return null
  }

  return <>{children}</>
}

AuthGuard.propTypes = {
  children: PropTypes.node,
}
