import React, {useContext} from 'react';
import { ReactComponent as DiscordIcon } from "../../assets/svg/discord-icon.svg";
import { ReactComponent as TwitterIcon } from "../../assets/svg/twitter-icon.svg";
import { ReactComponent as GithubIcon } from "../../assets/svg/github-icon.svg";
import { ReactComponent as ContactMushroom } from "../../assets/svg/contact-mushroom.svg";
import { useNavigate } from 'react-router-dom';

import styles from './index.module.scss';
import {Link, useLocation} from 'react-router-dom';
import AboutFAQ from "../AboutFAQ/AboutFAQ";
import GlobalContext from "../../context/GlobalContext";

type CardData = {
    title: string;
    content: string;
    link: string;
};

const CommonFooter:React.FC = () => {
    const location = useLocation();
    const router = useNavigate();
    const path = location.pathname;
    const globalContext = useContext(GlobalContext)


    const cardDataArray: CardData[] = [
        {
            title: "Basics",
            content: "Learn Spore Fundamentals - Quickly grasp the core concepts and components.",
            link: `${globalContext.baseUrl}/${globalContext.basic}`
        },
        {
            title: "Tutorial",
            content: "Follow Along - Build a toy project, dive in with easy to follow steps and examples.",
            link: `${globalContext.baseUrl}/${globalContext.tutorial}`
        },
        {
            title: "How to recipes",
            content: "Simplified Solutions - Find concise recipes to streamline your production.",
            link: `${globalContext.baseUrl}/${globalContext.howToRecipes}`
        },
        {
            title: "Resources",
            content: "Power tools - SDK, API, Contracts, and more!",
            link: `${globalContext.baseUrl}/${globalContext.resources}`
        },
    ];
    return (
        <>
            { (path == '/') &&
                <div className={styles.SpreadCreation}>
                    <h1 className={styles.FooterDesc}>
                        Explore, Learn and Build!
                    </h1>
                    <div className={`${styles.FooterText} sub-header`}>
                        Whether you're crafting a dynamic piece of code or turning a meme into an asset, we've got the perfect ecosystem for your ideas to flourish.
                    </div>
                    <div className={styles.DocumentationCard} onClick={() => router('/')}>
                        <h5 className={`${styles.CardTitle}`}>Documentation</h5>
                        <div className={`${styles.CardContent} body-1`}>
                            Get started mastering Spore Protocol, from basics to building your next project.
                        </div>
                        <div className={`${styles.CardButton} button-ct`}>
                            <Link to={`${globalContext.baseUrl}}`}>Visit</Link>
                        </div>
                    </div>
                    <div className={`${styles.FooterCardContainer}`}>
                        {cardDataArray.map((card, index) => (
                            <div key={index} className={`${styles.CardItem}`}  onClick={() => router(card.link)}>
                                <h5 className={`${styles.CardTitle}`}>{card.title}</h5>
                                <div className={`${styles.CardContent} body-1`}>
                                    {card.content}
                                </div>
                                <div className={`${styles.CardButton} button-ct`}>
                                    <Link to={card.link}>Visit</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
            <AboutFAQ />
            <div className={styles.ContactUsContainer}>
                <div className={styles.SocialMediaContainer}>
                    <div>
                        <Link to={"https://discord.gg/9eufnpZZ8P"} target={'_blank'}>
                            <DiscordIcon />
                        </Link>
                        <Link to={'https://github.com/sporeprotocol/spore-sdk'} target={'_blank'}>
                            <GithubIcon />
                        </Link>
                        <Link to={'mailto:contact@spore.pro'}>
                            <TwitterIcon />
                        </Link>

                    </div>
                    <h1>SPORE PROTOCOL</h1>
                </div>
                <div className={styles.ContactMushroom}>
                    <ContactMushroom />
                </div>
            </div>
        </>
    )
}

export default CommonFooter;
