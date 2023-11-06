    "use client"

    import React, { useState, useEffect, useRef } from 'react';
    import Image from "next/image";
    import Link from "next/link";
    import MenuItem from "@/components/Header/MenuItem/MenuItem";
    import {DocUrl} from "@/data/links";
    import MenuItems from "@/data/HeaderItem";

    const Header: React.FC = () => {
        // For PC
        const [isDocsHovered, setDocsHovered] = useState(false);
        // For mobile
        const [isDocsActive, setIsDocsActive] = useState(false);
        const hoverTimeoutRef = useRef<number | null>(null);
        const [isMenuOpen, setIsMenuOpen] = useState(false);

        const handleMouseEnter = () => {
            if (hoverTimeoutRef.current !== null) {
                clearTimeout(hoverTimeoutRef.current);
                hoverTimeoutRef.current = null;
            }
            setDocsHovered(true);
        };

        const handleDocsClick = () => {
            setIsDocsActive(!isDocsActive);
        };

        const toggleMenu = () => {
            setIsMenuOpen(!isMenuOpen);
        };

        const handleMouseLeave = () => {
            hoverTimeoutRef.current = window.setTimeout(() => {
                setDocsHovered(false);
            }, 100);  // 300 milliseconds delay
        };

        useEffect(() => {
            if (isMenuOpen) {
                // 当菜单打开时，禁用滚动
                document.body.style.overflow = 'hidden';
            } else {
                // 当菜单关闭时，恢复滚动
                document.body.style.overflow = '';
            }

            // 组件卸载时重置滚动
            return () => {
                document.body.style.overflow = '';
            };
        }, [isMenuOpen]);


        return (
            <div className={`flex flex-col max-w-[1440px] lg:px-[120px] md:px-10 sm:px-4 mx-auto mt-0 mb-0 ${isMenuOpen ? 'bg-Brand h-screen': ''}`}>
                <header className="flex sm:px-4 justify-between items-center py-4 relative z-[99]">
                    <div className="logo">
                        <Image
                            width={202}
                            height={32}
                            src={'/svg/dark-text-logo.svg'} alt={'logo'}
                        />
                    </div>

                    <nav className="hidden lg:flex">
                        <button className={`w-[80px] h-[32px] box-content px-4 py-2 text-b2 font-custom ${isDocsHovered ? 'font-medium text-BrandDarkGray' : 'border-b-2 border-Brand font-bold'}`}>Home</button>
                        <div className="z-99 relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <button className={`w-[80px] h-[32px] box-content px-4 py-2 text-b2 font-custom ${isDocsHovered ? 'border-b-2 border-Brand font-bold' : 'font-medium text-BrandDarkGray'}`}>
                                Docs
                            </button>
                            <div className={`absolute top-full mt-2 w-[598px] h-[340px] border-2 rounded-2xl border-BrandBlack bg-Brand ${isDocsHovered ? 'visible' : 'invisible'}`}>
                                <div className="flex box-border w-[574px] h-[316px] m-2 border-2 border-BrandBlack rounded-2xl bg-white">
                                    <div className="flex flex-col flex-1 border-r-2 border-BrandBlack px-6 py-4 gap-6">
                                        <MenuItem link={`${DocUrl.baseUrl}`} title={'Documentations'} intro={'Master Spore, from basics to building your next project'}/>
                                        <Image width={165} height={165} src={'/svg/Dropdown-mushroom.svg'} alt={'Header-Mushroom'} />
                                    </div>
                                    <div className="flex flex-1 flex-col items-center p-4 gap-1">
                                        {MenuItems.map(item =>
                                            <MenuItem key={item.intro} link={item.link} title={item.title} intro={item.intro}/>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <div className="hidden lg:flex icons gap-2">
                        <Link href={'https://github.com'}>
                            <Image
                                width={32}
                                height={32}
                                src={'/svg/github-pc.svg'} alt={'logo'}
                            />
                        </Link>
                        <Link href={'https://github.com'}>
                            <Image
                                width={32}
                                height={32}
                                src={'/svg/discord-pc.svg'} alt={'logo'}
                            />
                        </Link>
                        <Link href={'https://github.com'}>
                            <Image
                                width={32}
                                height={32}
                                src={'/svg/mail-pc.svg'} alt={'logo'}
                            />
                        </Link>
                    </div>
                    <div className={`hidden sm:flex md:flex w-11 h-11 ${isMenuOpen ? 'bg-menu-close' : 'bg-menu-collapse'} cursor-pointer`} onClick={toggleMenu}>
                    </div>
                </header>
                {
                    isMenuOpen &&
                    <div className="fixed inset-0 z-40 flex justify-center top-20 bottom-12 items-center bg-Brand">
                        <div className="relative flex flex-col items-center w-full h-full bg-white mx-10 rounded-3xl p-6">
                            <div className="text-BrandBlack font-inter text-b1 font-bold py-2 flex self-start">Home</div>
                            <div className="w-full text-BrandDarkGray font-inter text-b1 font-normal flex flex-col">
                                <div className="w-full flex justify-between py-2" onClick={handleDocsClick}>
                                    <div>Docs</div>
                                    <Image className={`${isDocsActive ? 'rotate-0' : 'rotate-180'}`} width={18} height={18} src={'/svg/mobile-menu-arrow.svg'} alt={'collapse'} />
                                </div>
                                {
                                    isDocsActive  &&
                                    <div className="px-8 text-BrandDarkGray font-inter text-b1 font-normal h-12 flex flex-col">
                                        <Link className="py-2 flex items-center" href={'/'}>Documentations</Link>
                                        <Link className="py-2 flex items-center" href={'/'}>Spore Protocol Basics</Link>
                                        <Link className="py-2 flex items-center" href={'/'}>Tutorial</Link>
                                        <Link className="py-2 flex items-center" href={'/'}>How to recipes</Link>
                                        <Link className="py-2 flex items-center" href={'/'}>Resources</Link>
                                    </div>
                                }
                            </div>
                            <div className="absolute flex bottom-6 icons gap-6">
                                <Link href={'https://github.com'}>
                                    <Image
                                        width={32}
                                        height={32}
                                        src={'/svg/github-pc.svg'} alt={'logo'}
                                    />
                                </Link>
                                <Link href={'https://github.com'}>
                                    <Image
                                        width={32}
                                        height={32}
                                        src={'/svg/discord-pc.svg'} alt={'logo'}
                                    />
                                </Link>
                                <Link href={'https://github.com'}>
                                    <Image
                                        width={32}
                                        height={32}
                                        src={'/svg/mail-pc.svg'} alt={'logo'}
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    };

    export default Header;
