import React from 'react'
import Container from './styles'

const InputGroup = ({
  children,
  onChange,
  label,
  type = 'text',
  name,
  height,
  id = '',
  className = '',
  disabled = false,
  required = false,
  autoComplete = 'off',
  optionLists,
  value = '',
  width,
  defaultValue = '',
  placeholder = '',
}) => {
  const handleTextInput = (e) => {
    if (typeof onChange === 'function') {
      onChange(e)
    }
  }

  return (
    <Container
      className={`input-group ${className}`}
      width={width}
      height={height}
      id={id}
    >
      {children ? (
        <>{children}</>
      ) : (
        <>
          {label && <label>{label}</label>}
          <div className="input-container">
            {type === 'select' ? (
              <>
                <select
                  name={name}
                  value={value}
                  disabled={disabled}
                  autoComplete={autoComplete}
                  required={required}
                  onChange={handleTextInput}
                >
                  {optionLists}
                </select>
              </>
            ) : (
              <input
                name={name}
                value={value}
                disabled={disabled}
                defaultValue={defaultValue}
                type={type}
                placeholder={placeholder}
                required={required}
                autoComplete={autoComplete}
                onChange={handleTextInput}
              />
            )}
          </div>
        </>
      )}
    </Container>
  )
}

export default InputGroup
