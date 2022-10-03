import Styled from 'styled-components';

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
`;
