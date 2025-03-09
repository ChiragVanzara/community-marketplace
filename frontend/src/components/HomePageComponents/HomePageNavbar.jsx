import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faSignOutAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { AuthContext, AuthProvider } from '@/context/AuthProvider';

const HomePageNavbar = () => {
    const accessToken = localStorage.getItem('accessToken');
    const { logout } = useContext(AuthContext);
    
    return (
        <nav className="border-b backdrop-blur-[20px] sticky top-0 z-50">
            <div className="flex items-center justify-end p-4">

                <div className="hidden md:flex items-center justify-between w-full space-x-4">
                    <div>
                        <Link to="/home" className="font-bold text-lg">
                            Cypher
                        </Link>
                    </div>
                    <div>
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link to="/about" className="text-sm font-medium">About</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link to="/services" className="text-sm font-medium">Services</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link to="/contact" className="text-sm font-medium">Contact</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    <div className='space-x-2'>
                        {
                            accessToken ? (
                                <Button onClick={() => logout()}>
                                    Logout<FontAwesomeIcon icon={faSignOutAlt} />
                                </Button>
                            ) : (
                                <>
                                    <Button variant="outline">
                                        <Link to='/sign-in'>Sign In</Link><FontAwesomeIcon icon={faRightToBracket} />
                                    </Button>
                                    <Button>
                                        <Link to='/sign-up'>Sign Up</Link><FontAwesomeIcon icon={faUserPlus} />
                                    </Button>
                                </>
                            )
                        }
                    </div>
                </div>

                <div className="md:hidden flex items-center justify-between w-full">
                    <div>
                        <Link to="/home" className="font-bold text-lg">
                            Cypher
                        </Link>
                    </div>
                    <div>
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link to="/about" className="text-sm font-medium">About</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link to="/services" className="text-sm font-medium">Services</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link to="/contact" className="text-sm font-medium">Contact</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <SidebarTrigger />
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default HomePageNavbar;