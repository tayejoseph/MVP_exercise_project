import Styled from 'styled-components'
import { rem } from 'polished'

export default Styled.div`
  width: ${({ width }) => width || '100%'};
  margin-bottom: 1.5em;

  input:not([type='checkbox']),
  textarea {
    height: ${({ height }) => height || rem('38px')}!important;
    width: 100%;
    border-radius: 5px;
    background: ${({ theme }) => theme.tertiary};
    border: 1.4px solid ${({ theme }) => theme.tertiary};
    letter-spacing: 0.14px;
    padding: 0px 1em;

    font-size: ${rem('14px')};
    font-weight: 400;
    color: #ffffff;
    letter-spacing: 0.14px;

    &:active,
    &:focus {
      outline: none;
      border: 1.4px solid ${({ theme }) => theme.colors.primary};
      background: ${({ theme }) => theme.tertiary};
    }
    &:invalid:not([value='']), &.error {
      border: 1.4px solid #c12020!important;
    }
    &:disabled {
      cursor: not-allowed !important;
      filter: blur(0.5px);
    }
  }

  input:-webkit-autofill {
    background-image: none !important;
    background-color: #18181a !important;
    border: none;
    outline-color: transparent;
    color: #ffffff !important;
    box-shadow: 0 0 0 1000px #18181a inset !important;
    -webkit-box-shadow: 0 0 0 1000px #18181a inset !important;
    -webkit-text-fill-color: #ffffff !important;
  }

  input::-webkit-calendar-picker-indicator {
   cursor: pointer;
    border-radius: 4px;
    margin-right: 2px;
    opacity: 0.6;
    filter: invert(0.8); 
  }

  select {
    height: ${({ height }) => height || rem('38px')};
    width: 100%;
    border-radius: 5px;
    background: ${({ theme }) => theme.tertiary};
    border: 1.4px solid ${({ theme }) => theme.tertiary};
    letter-spacing: 0.14px;
    padding: 0px 1em;
    font-size: ${rem('14px')};
    font-weight: 400;
    color: #ffffff;
    letter-spacing: 0.14px;

    &:active,
    &:focus {
      outline: none;
      background: ${({ theme }) => theme.tertiary};
      border: 1.4px solid ${({ theme }) => theme.tertiary};
    }
    &.error {
      border: 1.4px solid #c12020!important;
    }
    &:disabled {
      cursor: not-allowed !important;
    }
  }

  input::placeholder {
    color: #595f62;
    font-size: ${rem('14px')};
    letter-spacing: 0.14px;
    font-weight: 400;
  }

  label {
    display: flex;
    grid-gap: 0.5em;
    align-items: center;
    font-weight: 400;
    font-size: ${rem('14px')};
    line-height: ${rem('20px')};
    letter-spacing: 0px;
    color: #fff;
    margin-bottom: 0.5em;
  }

  textarea {
    height: ${({ height }) => height || rem('108px')};
    padding: 1em;
    resize: none;
  }

  div.input-container {
    position: relative;

    span {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      font-size: 0.8rem;
      color: #fff;
      padding-left: 0.5em;
    }
    input {
      padding-left: 3em;
    }
  }
  
`
