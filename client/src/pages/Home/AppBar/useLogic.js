import useStore from "hooks/useStore"
import { useMediaQuery, useTheme } from "@material-ui/core"
import { post } from "libraries/fetch"
import { makeCall } from "libraries/webrtc"

function refresh() {
  window.location.assign("/")
}

function useLogic() {
  const setConnection = useStore("connection", false)
  const addNotification = useStore("notifications", false)
  const setOpenDrawer = useStore("openDrawer", false)
  const [connection] = useStore("connection")
  const [offer] = useStore("offer")
  const [activeRoom] = useStore("activeRoom")
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"))

  async function logout() {
    const { error } = await post("/user/logout")
    if (error) {
      addNotification({ action: "push", value: error })
    } else {
      refresh()
    }
  }

  function toggleDrawer() {
    setOpenDrawer(true)
  }

  async function handleCall() {
    setConnection(makeCall(activeRoom, () => setConnection(null)))
  }

  return {
    hasActiveCall: !!connection || !!offer,
    handleCall,
    activeRoom,
    logout,
    refresh,
    toggleDrawer,
    isDesktop,
  }
}

export default useLogic