import { GlobalContext } from "@/context/global-context";
import { Box, Container, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { useContext } from "react";
import { CiHome, CiLogout, CiUser } from "react-icons/ci";
import { IoBookOutline } from "react-icons/io5";

export default function BottomMenuNav(){

    const {logout} = useContext(GlobalContext);

    return (
        <Container p={0} marginBottom={"-25px"} maxW={'xl'} className=" fixed block w-fit h-fit bottom-0  z-10">
        `<Flex gap={0} className="p-3 text-white bottom-0" background={"black"}>
            <Box className="w-full hover:cursor-pointer hover:text-blue-300 justify-center inline-block text-center">
                <Link href={"/"}>
                    <CiHome className="text-md w-full"/>
                    <span className="text-sm">all post</span>
                </Link>
            </Box>
            <Box className="w-full hover:cursor-pointer hover:text-blue-300 justify-center inline-block text-center">
                <Link href={"/"}>
                    <IoBookOutline className="text-md w-full"/>
                    <span className="text-sm">my post</span>
                </Link>
            </Box>
            <Box className="w-full hover:cursor-pointer hover:text-blue-300 justify-center inline-block text-center">
                <Link href={"/profile"}>
                    <CiUser className="text-md w-full"/>
                    <span className="text-sm">my profile</span>
                </Link>
            </Box>
            <Box className="w-full hover:cursor-pointer hover:text-blue-300 justify-center inline-block text-center">
                <div onClick={logout}>
                    <CiLogout className="text-md w-full"/>
                    <span className="text-sm">logout</span>
                </div>
            </Box>
        </Flex>`
        </Container>
    );
}