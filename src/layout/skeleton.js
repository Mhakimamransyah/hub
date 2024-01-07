import { Container } from "@chakra-ui/react";

export function Skeleton({ children }) {
    return (
        <Container className="h-full" p={0} maxW={'xl'}>
            {children}
        </Container>
    );
}