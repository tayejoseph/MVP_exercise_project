import Styled from 'styled-components';

export default Styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 75vh;
    align-items: space-between;
    justify-content: flex-start;

    header {
        h1 {
            font-size: 1.5rem;
            color: #011F4B;
        }
        margin-bottom: 1.5em;
    }

    div.loading-container {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    div.report-content {
        background: #F1FAFE;
        border-radius: 10px;
        padding: 1.5em;
        flex: 1;
        h1 {
            color: #011F4B;
            font-size: 1.1rem;
            margin-bottom: 1.5em;
        }
    }
`;
