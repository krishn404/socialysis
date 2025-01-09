declare module 'react-world-flags' {
  import { FC } from 'react'
  
  interface FlagProps {
    code: string
    className?: string
  }
  
  const Flag: FC<FlagProps>
  export default Flag
} 