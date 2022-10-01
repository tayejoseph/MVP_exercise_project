import Styled from 'styled-components'
import { rem, rgba } from 'polished'
import { maxQuery } from 'helpers'

export default Styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 75vh;
    align-items: space-between;
    justify-content: flex-start;

    header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1.5em;
        grid-gap: 1em;

        ${maxQuery('xl')} {
            flex-direction: column;
        }

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

                &.error-msg {
                    color: ${({ theme }) => theme.colors.danger};
                    font-size: 0.8rem;
                    min-height: 1rem;
                }
            }
        }

        div.col-2 {
            display: flex;
            align-items: center;
            grid-gap: 1em;

            ${maxQuery('xl')} {
                flex-wrap: wrap;
            }


            button {
                flex-shrink: 0;
                background: ${({ theme }) => theme.secondary};
                border-radius: 5px;
                color: #fff;
                border: none;
                outline: none;
                font-size: 0.9rem;
                padding: 0px 1em;
                height: ${rem('38px')}!important;
                &:hover, &:focus {
                    background: ${({ theme }) => rgba(theme.secondary, 0.8)};
                }
                &:disabled {
                    cursor: no-drop!important;
                }
            }
            div.input-group {
                margin: 0px;
                max-width: 10rem;
            }
        }
    }

    div.loading-container {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    div.report-row {
        display: flex;
        grid-gap: 2em;

        ${maxQuery('xl')} {
            flex-direction: column;
            grid-gap: 3em;
        }
        
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
