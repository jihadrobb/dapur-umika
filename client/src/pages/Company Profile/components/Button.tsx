import React, { ComponentType, FC, ReactNode } from 'react'
import { IconType } from 'react-icons'
import './Button.css'

interface ButtonProps {
  children: string
  Icon?: IconType
  type?: 'button' | 'submit' | 'reset' | undefined
  buttonStyle?: 'btn-primary' | 'btn-outline'
  buttonSize?: 'btn-medium' | 'btn-large' | 'btn-mobile' | 'btn-wide'
  buttonColor?: 'primary' | 'blue' | 'red' | 'green'
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export const Button: FC<ButtonProps> = ({
  children,
  Icon,
  type,
  buttonStyle,
  buttonSize,
  buttonColor,
  onClick,
  onMouseEnter,
  onMouseLeave
}) => {
  return (
    <button
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`btn ${buttonStyle || 'btn-primary'} ${
        buttonSize || 'btn-medium'
      } ${buttonColor}`}
      onClick={(e) => {
        e.preventDefault()
        onClick?.()
      }}
      type={type || 'button'}
    >
      {Icon ? <Icon className="icon" /> : null}
      {children}
    </button>
  )
}
