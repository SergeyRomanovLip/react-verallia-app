import { useState } from 'react'

export const reboot = () => {
  const [reboot, setReboot] = useState(false)

  const reboot = () => {
    setReboot(reboot ? false : true)
  }

  return { reboot, setReboot }
}
