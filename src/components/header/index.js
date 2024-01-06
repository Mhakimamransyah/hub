import { GlobalContext } from "@/context/global-context";
import { ChevronDownIcon, InfoOutlineIcon, UnlockIcon } from "@chakra-ui/icons";
import { Avatar, Box, Flex, Menu, MenuButton, MenuItem, MenuList, Spacer } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext } from "react";

export default function Header() {

    const router = useRouter();
    const {data,logout} = useContext(GlobalContext);

    return (
        <Flex className="" p={3} bg='blue.50'>
            <Box>
                <p className="font-bold text-lg font-extrabold hover:text-blue-700 hover:cursor-pointer" onClick={()=>{router.push("/")}}>HUB</p>
            </Box>
            <Spacer/>
            <Box>
                <Menu>
                    <MenuButton>
                        <Avatar h={30} w={30} name={data?.data?.name}/>
                        <ChevronDownIcon/>
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={()=>{router.push("/profile")}}><InfoOutlineIcon className="mr-2"/>Profile</MenuItem>
                        <MenuItem onClick={()=>logout()}><UnlockIcon className="mr-2" />Logout</MenuItem>
                    </MenuList>
                </Menu>
            </Box>
        </Flex>
    );
}