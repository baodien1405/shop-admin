import { z } from 'zod'

export const useAuthSchema = () => {
  return z.object({
    name: z.string().nonempty('Please enter name'),
    email: z.string().nonempty('Please enter email').email('Invalid email format'),
    password: z.string().nonempty('Please enter password').min(6, 'Password must be at least 6 characters long')
  })
}
