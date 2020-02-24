import { useEffect } from "react"
import { get } from "libraries/fetch"
import useStore from "hooks/useStore"

function useLogic() {
  const addNotification = useStore("notifications", false)
  const [logged] = useStore("logged")
  const setServers = useStore("servers", false)

  useEffect(() => {
    async function getServers() {
      const response = await get("/server/get")

      if (response.error) {
        addNotification({ action: "push", value: response.error })
        return
      }

      if (response instanceof Array) setServers(response)
    }

    if (logged) getServers()
  }, [logged, addNotification, setServers])

  return { logged }
}

export default useLogic