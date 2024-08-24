import { ReactNode } from 'react'

const AuthLayout = ({
  children
}: {
  children: ReactNode
}) => {
  return (
    <div className='h-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500'>
      {children}
    </div>
  )
}

export default AuthLayout
