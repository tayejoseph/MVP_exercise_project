import styled, { css } from 'styled-components'
import { lighten, rgba, rem } from 'polished'

export default styled.button`
  &:disabled {
    cursor: not-allowed !important;
  }

  position: relative;
  cursor: pointer;
  outline: none;
  box-shadow: none;

  ${(props) => css`
    padding: 0px 1em;
    height: ${({ height }) => height || rem('38px')}!important;
    font-size: 0.9rem;
    border-radius: 5px;
    font-weight: 400;
    user-select: none;
    outline: none;
    background: transparent;
    width: ${props.full ? '100%' : 'fit-content'};
    display: ${props.full ? 'flex' : 'inline-flex'};
    align-items: center;
    justify-content: center;
    grid-gap: 1em;
    ${
      props.primary &&
      css`
        border: 1px solid ${props.theme.primary};
        background-color: ${({ theme }) => theme.primary};
        color: #fff;

        &:hover,
        &:focus {
          border: 1px solid ${rgba(props.theme.primary, 0.8)};
        }

        &:disabled {
          cursor: no-drop;
          background: #2b2b2d;
          color: #d8d8d899;
          border-color: #2b2b2d;
        }
      `
    }

    ${
      props.secondary &&
      css`
        border: 1px solid ${({ theme }) => theme.primary} !important;
        border-color: #fff;
        box-shadow: none;
        background: #4f21ea1a;
        box-shadow: none;
        color: #fff;

        &:hover,
        &:focus {
          background: transparent;
          border-color: ${({ theme }) =>
            lighten(0.1, theme.primary)} !important;
          border: 1px solid ${({ theme }) => theme.primary} !important;
        }

        &:disabled {
          cursor: no-drop;
          background: #2b2b2d;
          color: #d8d8d899;
          border-color: #2b2b2d !important;
        }
      `
    }
    
    ${
      props.tertiary &&
      css`
        background: #111111 0% 0% no-repeat padding-box;
        box-shadow: inset 0px 0px 2px #00000029;
        border-radius: 8px;
        /* padding: 0.5em; */
        border-color: #111111;
        &:hover,
        &:focus {
          background: #111111 0% 0% no-repeat padding-box;
          box-shadow: inset 0px 0px 2px #00000029;
          border-radius: 8px;
          border-color: #111111;
        }
      `
    }
  `}
`
