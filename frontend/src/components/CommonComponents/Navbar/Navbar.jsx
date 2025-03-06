import React from 'react';
import { Link } from 'react-router-dom';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const accessToken = localStorage.getItem('accessToken');
    return (
        <nav className="border-b  backdrop-blur-[10px] sticky top-0 z-50">
            <div className="container flex items-center justify-between p-4">

                <div className="hidden md:flex items-center justify-between w-full space-x-4">
                    <div>
                        <Link to="/" className="font-bold text-lg">
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
                                    <NavigationMenuLink asChild>
                                        <Link to="/home" className="text-sm font-medium">Home</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    <div className='space-x-2'>
                        {
                            accessToken ? (
                                <></>
                            ) : (
                                <>
                                    <Button variant="outline"><Link to='/sign-in'>Sign In</Link><FontAwesomeIcon icon={faRightToBracket} /></Button>
                                    <Button><Link to='/sign-up'>Sign Up</Link><FontAwesomeIcon icon={faUserPlus} /></Button>
                                </>
                            )
                        }
                    </div>
                </div>

                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu className="h-4 w-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <SheetHeader>
                                <SheetTitle>Menu</SheetTitle>
                                <SheetDescription>Welcome to MarketPlace.</SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-4 p-4">
                                <Link to="/about" className="text-sm font-medium">About</Link>
                                <Link to="/services" className="text-sm font-medium">Services</Link>
                                <Link to="/contact" className="text-sm font-medium">Contact</Link>
                                <Link to="/home" className="text-sm font-medium">Home</Link>
                                {
                                    accessToken ? (
                                        <></>
                                    ) : (
                                        <>
                                            <Button variant="outline"><Link to='/sign-in'>Sign In</Link><FontAwesomeIcon icon={faRightToBracket} /></Button>
                                            <Button><Link to='/sign-up'>Sign Up</Link><FontAwesomeIcon icon={faUserPlus} /></Button>
                                        </>
                                    )
                                }
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;