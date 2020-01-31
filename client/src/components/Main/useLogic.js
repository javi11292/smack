import { useEffect } from "react"
import { get } from "libraries/fetch"
import useStore from "hooks/useStore"

function useLogic() {
  const [logged, setLogged] = useStore("logged")

  useEffect(() => {
    async function checkSession() {
      try {
        const { logged } = await get("/user/session")
        setLogged(logged)
      } catch {
        setLogged(false)
      }
    }

    checkSession()
  }, [setLogged])

  return { logged }
}

export default useLogic