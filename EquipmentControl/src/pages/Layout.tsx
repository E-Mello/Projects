import { Flex } from '@chakra-ui/react';
import React from 'react';
import { Sidebar } from '../components/Sidebar';


export function Layout() {
    return (
        <>
            <Flex>
                <Sidebar />
            </Flex>
            <Flex>
                {/*<Outlet /> */}
            </Flex>
        </>
    );
}