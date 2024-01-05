import { ChakraProvider, Container } from "@chakra-ui/react";

export function Skeleton({ children }) {
    return (
        <ChakraProvider>
            <Container className="h-screen" maxW={'md'} bg={'blue.100'}>
                {children}
            </Container>
        </ChakraProvider>
    );
}