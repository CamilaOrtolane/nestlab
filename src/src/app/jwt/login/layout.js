'use client'

//
import PropTypes from 'prop-types'
// auth
import { GuestGuard } from 'src/auth/guard'
// layouts
import { AuthClassicLayout } from 'src/layouts/auth'

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <GuestGuard>
      <AuthClassicLayout>{children}</AuthClassicLayout>
    </GuestGuard>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}
