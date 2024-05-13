import clsx from 'clsx'
import {Fragment} from "react";

export function Logo({className, ...props}) {
  return (
    <div className= "overflow-hidden">
      <img
        decoding="async"
        src={require('@/img/hug/sticky-logo.png').default.src}
        alt="ApiHug"
        className="dark:hidden"
      />
      <img
        decoding="async"
        src={require('@/img/hug/main-logo.png').default.src}
        alt="ApiHug"
        className="dark:block hidden"
      />
    </div>
  )
}
