import React from 'react'
import { ThemeContext } from '../../Store/ThemeContext'

export const useCalcFooterPadding = () => {
  const { drawerWidth, pFooter } = React.useContext(ThemeContext)

}