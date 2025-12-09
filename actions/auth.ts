import { fetcher } from "@/lib/fetcher"
import { User } from "@/types"

export interface SuccessLoginResponse {
  message: string
  user: User
}

export const loginUser = async (accessToken: string) => {
  try {
    const res = await fetcher<{ data: SuccessLoginResponse }>(
      "POST",
      "/auth/login",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    return res.data.user
  } catch (error) {
    console.log(error)
    return null
  }
}
