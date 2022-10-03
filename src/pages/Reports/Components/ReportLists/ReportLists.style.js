import Styled from 'styled-components';
import { maxQuery } from 'helpers';

export default Styled.div`
    display: grid;
    grid-gap: 1.5em;

    div.project-item {
        background: #FFFFFF;
        border-radius: 10px;
        cursor: pointer;
        padding: 1.5em 1em;
        display: flex;
        justify-content: space-between;
        h3 {
            font-size: 0.9rem;
            color: #011F4B;
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
