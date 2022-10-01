import Styled, { css } from 'styled-components'

export default Styled.div`
    padding-top: ${({ theme }) => theme.dimensions.navHeight};
    padding-bottom: ${({ theme }) => theme.dimensions.bottomNavHeight};
    div.dashboard-top_nav {
        position: fixed;
        width: 100vw;
        border-bottom: 2px solid #F3F6F9;
        display: flex;
        top: 0px;
        background: #fff;
        left: 0px;
        z-index: 99;
        justify-content: space-between;
        align-items: center;
        height: ${({ theme }) => theme.dimensions.navHeight};
        padding: 0px 1.5em;

        div.col-1 {
            display: flex;
            align-items: center;
            grid-gap: 1.5em;

            .brand-logo {
                svg {
                    font-size: 2rem;
                }
            }
            button.menu-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                background: transparent;
                border: none;
                svg {
                    font-size: 1.5rem;
                }
            }
        }

        div.col-2 {
            display: flex;
            align-items: center;
            grid-gap: 1em;
            cursor: pointer;

            div.profile-name {
                background: #F6CA65;
                border-radius: 5px;
                height: 2.5rem;
                width: 2.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
                
                p {
                    color: #fff;
                    font-size: 1.2rem;
                    font-weight: 600;
                }
            }

            p {
                color: ${({ theme }) => theme.primary};
                font-size: 1rem;
                font-weight: 500;
            }
        }
    }

    div.dashboard-row {
        padding-left:  ${({ theme }) => theme.dimensions.sideNavWidth};
            transition: all 0.5s;
        ${({ showMenu }) =>
          showMenu &&
          css`
            padding-left: 0px;
          `}

        aside.dashboard-aside {
            position: fixed;
            top: 0px;
            left: 0px;
            transition: all 0.5s;
       
            ${({ showMenu }) =>
              showMenu &&
              css`
                transform: ${({ theme }) =>
                  `translateX(-${theme.dimensions.sideNavWidth})`};
              `}

            height: 100vh;
            padding-top: ${({ theme }) => theme.dimensions.navHeight};
            width: ${({ theme }) => theme.dimensions.sideNavWidth};
    
            nav {
                padding-top: 2em;
                ol {
                    padding: 0px;
                    margin: 0px;
                    list-style: none;
                    display: grid;
                    grid-gap: 1.5em;
    
                    li {
                        display: flex;
                        align-items: center;
                        justify-content: center;
    
                        svg {
                            font-size: 1.5rem;
                        }
                    }
                }
            }
        }

        main.dashboard-main {
            padding: 1.5em;
            padding-top: 2em;
            padding-bottom: ${({ theme }) => theme.dimensions.navHeight};
        }
    }

    footer.dashboard-footer {
        position: fixed;
        width: 100vw;
        bottom: 0px;
        left: 0px;
        background: #fff;
        padding-left:  ${({ theme }) => theme.dimensions.sideNavWidth};
            transition: all 0.5s;
        ${({ showMenu }) =>
          showMenu &&
          css`
            padding-left: 0px;
          `}


        ol {
            display: flex;
            margin: 0px;
            padding-left: 1em;
            height: ${({ theme }) => theme.dimensions.navHeight};
            align-items: center;
            list-style: none;
            li {
                padding: 0px 1em;
                &:not(:last-of-type) {
                    border-right: 1px solid #005B96;
                }
                a {
                    color: #005B96;
                    text-decoration: none;
                    font-size: 0.9rem;
                    &:hover, &:focus, &:active {
                        text-decoration: underline;
                        outline: none;
                    }
                }
            }
        }
    }

`
