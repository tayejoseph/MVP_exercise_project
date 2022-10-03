import Styled from 'styled-components';

export default Styled.div`
    div.label-lists {
        display: flex;
        grid-gap: 1.5em;
        flex-wrap: wrap;
        background: #F1FAFE;
        border-radius: 10px;
        height: 3rem;
        margin-bottom: 1em;
        padding: 1em;

        div.label-item {
            display: flex;
            align-items: center;
            grid-gap: 0.5em;
            font-size: 0.9rem;
            
            span {
                width: 1rem;
                height: 1rem;
                border-radius: 5px;
            }
            
            p {
                color: #011F4B;
            }
        }
    }

    div.chart-container {
        display: flex;
        width: fit-content;
        justify-content: center;
        margin: 2em 0px;
        align-items: center;
        width: fit-content;
    }
`;
