import { GlobalContext } from "@/context/global-context";
import { BellIcon } from "@chakra-ui/icons";
import { Box, Container, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { CiBellOn, CiHome, CiLogout, CiUser } from "react-icons/ci";
import { IoBookOutline } from "react-icons/io5";

export default function BottomMenuNav(){

    const {logout} = useContext(GlobalContext);
    const router = useRouter();

    return (
        <Container p={0} marginBottom={"-24px"} maxW={'xl'} className=" fixed block w-fit h-fit bottom-0  z-10">
        `<Flex gap={0} className="p-3 text-white bottom-0" background={"black"}>
            <Box className="w-full hover:cursor-pointer hover:text-blue-300 justify-center inline-block text-center">
                <Link href={"/"} className={(router.pathname === "/")? `text-blue-500` : `text-white`}>
                    <CiHome className="text-md w-full"/>
                    <span className="text-sm">dashboard</span>
                </Link>
            </Box>
            <Box className="w-full hover:cursor-pointer hover:text-blue-300  justify-center inline-block text-center ">
                <Link href={"/profile"} className={(router.pathname === "/profile")? `text-blue-500` : `text-white`}>
                    <CiUser className="text-md w-full"/>
                    <span className="text-sm">profile</span>
                </Link>
            </Box>
            <Box className="w-full hover:cursor-pointer hover:text-blue-300 justify-center inline-block text-center">
                <Link href={"/notification"} className={(router.pathname === "/notification")? `text-blue-500` : `text-white`}>
                    <CiBellOn className="text-md w-full"/>
                    <span className="text-sm">notification</span>
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