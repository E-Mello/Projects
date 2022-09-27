import { Flex } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';


export function Layout(props: any) {
    return (
        <>
            <Flex>
                <Sidebar />
            </Flex>
            <Outlet />
        </>
    );
}