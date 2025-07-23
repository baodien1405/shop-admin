import { NavLink } from 'react-router-dom'
import { classNames } from 'primereact/utils'
import { Image } from 'primereact/image'

import { svgs } from '@/assets'

interface LogoProps {
  imgClass?: string
  textClass?: string
}

export const Logo = ({ imgClass, textClass }: LogoProps) => {
  return (
    <NavLink className='inline-flex items-center gap-3' to='/'>
      <span className={classNames('relative w-10', imgClass)}>
        <Image src={svgs.LOGO_LIGHT} />
      </span>

      <h4 className={textClass}>ShopAdmin</h4>
    </NavLink>
  )
}
