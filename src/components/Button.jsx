import React from 'react'

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-full font-semibold focus:outline-none transition'
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    outline: 'border border-indigo-600 text-indigo-600 bg-transparent hover:bg-indigo-50',
    ghost: 'bg-transparent text-indigo-600 hover:bg-indigo-50',
  }
  const vclass = variants[variant] || variants.primary

  return (
    <button className={`${base} ${vclass} ${className}`.trim()} {...props}>
      {children}
    </button>
  )
}
