import { Separator } from '@/components/ui/separator';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
    useSidebar
} from '@/components/ui/sidebar'
import { faCircleUser, faInbox, faListCheck, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const AppSidebar = ({ children }) => {
    const { open, openMobile, setOpenMobile } = useSidebar();
    const [darkMode, setDarkMode] = useState(false);
    return (
        <>
            <Sidebar variant='floating' collapsible='icon' >
                <SidebarHeader>
                    <div className='text-3xl flex justify-between items-center'>
                        <div>{open && "Menu"}{openMobile && "Menu"}</div>
                        <div>
                            <SidebarTrigger />
                        </div>
                    </div>
                </SidebarHeader>

                <Separator className='my-1' />

                <SidebarContent>
                    <SidebarMenu>
                        <SidebarMenuItem className='ml-2'>
                            <Link to='/my-profile' onClick={() => setOpenMobile(false)}>
                                <SidebarMenuButton>
                                    <FontAwesomeIcon icon={faCircleUser} size='2xl' />My Profile
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                        <SidebarMenuItem className='ml-2'>
                            <Link to='/inbox' onClick={() => setOpenMobile(false)}>
                                <SidebarMenuButton>
                                    <FontAwesomeIcon icon={faInbox} size='2xl' />Inbox
                                    <SidebarMenuBadge>7</SidebarMenuBadge>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                        <SidebarMenuItem className='ml-2'>
                            <Link to='/products' onClick={() => setOpenMobile(false)}>
                                <SidebarMenuButton>
                                    <FontAwesomeIcon icon={faListCheck} size='2xl' />Manage Product
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarContent>

                <SidebarFooter className='mt-auto'>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton onClick={() => setDarkMode(!darkMode)} >
                                {darkMode ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
            <SidebarInset>
                {children}
            </SidebarInset>
        </>
    )
}

export default AppSidebar
