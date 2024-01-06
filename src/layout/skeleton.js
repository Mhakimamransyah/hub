import { Container } from "@chakra-ui/react";

export function Skeleton({ children }) {
    return (
        <Container className="h-fit" p={0} maxW={'xl'} bg={'blue.100'}>
            {children}
        </Container>
    );
}