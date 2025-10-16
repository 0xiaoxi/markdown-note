import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export const RootLayout = ({ children, className, ...props }: ComponentProps<'div'>) => {
  return (
    <div className={twMerge('flex flex-row h-screen', className)} {...props}>
      {children}
    </div>
  )
}

export const Sidebar = ({ children, className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={twMerge(
        'flex flex-col w-64 border-r border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export const Content = ({ children, className, ref, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      ref={ref}
      className={twMerge('flex-1 overflow-auto bg-gray-50 dark:bg-gray-800', className)}
      {...props}
    >
      {children}
    </div>
  )
}

Content.displayName = 'Content'
