import React from 'react'
import { Spinner } from '../'
import Container from './styles'

const Button = (props) => {
  const {
    type = 'button',
    className = '',
    primary,
    loading,
    secondary,
    children,
    disabled,
    spinnerWithTxt,
    style,
    tertiary,
    onClick,
    theme,
    ...rest
  } = props
  return (
    <Container
      type={type}
      className={className}
      spinnerWithTxt={spinnerWithTxt ? spinnerWithTxt : undefined}
      disabled={disabled ? disabled : !!loading}
      primary={(!secondary && !secondary) || primary}
      secondary={secondary ? secondary : undefined}
      tertiary={tertiary ? tertiary : undefined}
      style={style}
      onClick={onClick}
      {...rest}
    >
      {loading ? (
        <>
          <Spinner size={'1.1rem'} />
          {children}
        </>
      ) : (
        children
      )}
    </Container>
  )
}

export default Button
