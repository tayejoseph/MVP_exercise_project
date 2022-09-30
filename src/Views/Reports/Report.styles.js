import Styled from 'styled-components'

export default Styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 50vh;
    align-items: space-between;
    justify-content: flex-start;

    header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1.5em;

        div.col-1 {
            display: grid;
            grid-gap: 0.5em;
            h1 {
                font-size: 1.5rem;
                color: #011F4B;
            }
            p {
                color: #7E8299;
                font-size: 1rem;
            }
        }

        div.col-2 {
            display: flex;
            align-items: center;
            grid-gap: 1em;

            button {
                flex-shrink: 0;
                /* padding: 1em; */
            }
            div.input-group {
                margin: 0px;
            }
        }
    }

    div.report-row {
        display: flex;
        grid-gap: 2em;
        
        div.report-container-col {
            flex: 1
        }

        div.analysis-container {
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
        }
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

        div.project-lists {
            display: grid;
            /* flex: 1; */
            grid-gap: 1.5em;

            div.project-item {
                background: #FFFFFF;
                border-radius: 10px;
                cursor: pointer;
                padding: 1em;
                display: flex;
                justify-content: space-between;
                h3 {
                    font-size: 0.9rem;
                    color: #011F4B;
                }
            }
            table {
                border: none;
                border-collapse: collapse;
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
    }

    div.total-container {
        background: #F1FAFE;
        border-radius: 10px;
        margin-top: 1.5em;
        padding: 1em;
        h3 {
            font-size: 1.1rem;
            color: #011F4B;
        }
    }
`
