import type { ComponentPropsWithoutRef } from 'react'
import { Slot } from 'radix-ui'
import './Button.css'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  asChild?: boolean
  size?: 'md' | 'lg'
  block?: boolean
}

export function Button({ asChild, size = 'md', block, className, ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : 'button'
  const classes = ['cta', size === 'lg' && 'cta--lg', block && 'cta--block', className]
    .filter(Boolean)
    .join(' ')
  return <Comp className={classes} {...props} />
}
