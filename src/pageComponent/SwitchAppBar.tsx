import React from 'react'
import { useAuth } from '../lib/auth/AuthProvider'
import WebSiteDrawer from './WebsiteDrawer'

export const SwitchAppBar:React.FC = ({children}) => {
  const {user} = useAuth()

  if (user !== null) {
    <>
      {children}
    </>
  }

  return (
    <WebSiteDrawer id="back-to-top-anchor">
      {children}
    </WebSiteDrawer>
  )
}
