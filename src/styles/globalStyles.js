import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';
import { maxQuery } from 'helpers';

export default createGlobalStyle`
    ${normalize};
    * {
        box-sizing: border-box;
    }
      
    html, body {
      font-family: ${({ theme }) => theme.fontFamily};
      padding: 0px;
      margin: 0px;
      background: ${({ theme }) => theme.bgColor};    
      ${maxQuery('lg')} {
        font-size: 95%;
      }
      ${maxQuery('sm')} {
        font-size: 90%;
      }
    }
    html { 
      overflow-y: overlay;
      overflow-x: hidden;
      body {  
        width: 100vw; 
        &.disable--scroll {
          overflow: hidden;
        }
      }
      button {
        cursor: pointer;
      }
      hr {
        border: none;
        border-bottom: 1px solid #EEF0F9;
      }
      h1, h2, h3, h4, p {
        margin: 0px;
        padding: 0px;
      }
      strong {
        font-weight:500;
      }
    }

  img {
    ${maxQuery('lg')} {
      width: 100%;
    }
  }

  div.table-container {
      width: 100%;
      overflow-x: auto;
      table {
          border: none;
          width: 100%;
          border-collapse: collapse;
          ${maxQuery('xl')} {
              min-width: 55rem;
          }
          th, td {
              text-align: center;
              color: #011F4B;
              font-size: 1rem;
          }
          tr {
              height: 3rem;
          }
          tr:nth-child(even) {
              background: #fff;
          }
      }
  }
`;
