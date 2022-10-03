import React from 'react';
import PropTypes from 'prop-types';
import Container from './InputGroup.styles';

const InputGroup = ({
  children,
  onChange,
  label,
  type = 'text',
  name,
  flexLabel = '',
  height,
  id = '',
  className = '',
  disabled = false,
  required = false,
  autoComplete = 'off',
  optionLists,
  value = '',
  width,
  placeholder = '',
  ...rest
}) => {
  const handleTextInput = (e) => {
    if (typeof onChange === 'function') {
      onChange(e);
    }
  };

  return (
    <Container className={`input-group ${className}`} width={width} height={height} id={id}>
      {children ? (
        <>{children}</>
      ) : (
        <>
          {label && <label>{label}</label>}
          <div className="input-container">
            {flexLabel && <span className="flex-label">{flexLabel}</span>}
            {type === 'select' ? (
              <>
                <select
                  name={name}
                  value={value}
                  disabled={disabled}
                  autoComplete={autoComplete}
                  required={required}
                  onChange={handleTextInput}
                  {...rest}>
                  {optionLists}
                </select>
              </>
            ) : (
              <input
                name={name}
                value={value}
                disabled={disabled}
                type={type}
                placeholder={placeholder}
                required={required}
                autoComplete={autoComplete}
                onChange={handleTextInput}
                {...rest}
              />
            )}
          </div>
        </>
      )}
    </Container>
  );
};

InputGroup.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  children: PropTypes.element,
  label: PropTypes.string,
  type: PropTypes.string,
  flexLabel: PropTypes.string,
  height: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  autoComplete: PropTypes.string,
  optionLists: PropTypes.object,
  width: PropTypes.string,
  placeholder: PropTypes.string
};

export default InputGroup;
