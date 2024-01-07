import { ChatIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, FormControl, Grid, GridItem, Menu, MenuButton, MenuItem, MenuList, ModalBody, ModalCloseButton, ModalFooter, ModalHeader, Spacer, Textarea } from "@chakra-ui/react";
import moment from "moment";
import { AiFillLike } from "react-icons/ai";
import { IoChatboxEllipsesOutline, IoPencil, IoTrashBin } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";
import Cookies from "js-cookie";
import { useMutatation } from "@/hooks/use-mutation";
import { useRouter } from "next/router";
import { useRef } from "react";
import Replies from "../list-replies";



export default function Posts({id, description, user, is_own_post, created_at, likes_count,is_like_post,replies_count, setContentModal, onOpen, onClose}){

    const router = useRouter();
    const {mutate, isLoading} = useMutatation();
    const inputDescription = useRef();

    const editPost = (id, desc) => {
        setContentModal(
            <div>
                <form>
                    <ModalHeader>
                        <ChatIcon className="mr-2"/>
                    </ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <FormControl>
                            <Textarea ref={inputDescription}>
                                {desc}
                            </Textarea>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        {
                            (isLoading)? 
                            <Button
                                className="w-full" 
                                disabled
                            >
                                <IoPencil className="mr-1"/>Updating...
                            </Button>
                            : 
                            <Button
                                onClick={async ()=>{
                                    mutate({
                                        url : `https://paace-f178cafcae7b.nevacloud.io/api/post/update/${id}`,
                                        method : "PATCH",
                                        payload : JSON.stringify({
                                            description : inputDescription.current.value
                                        }),
                                        headers : {
                                            Authorization : `Bearer ${Cookies.get("token")}`
                                        },
                                        onSuccess : () => {
                                            onClose();
                                            setTimeout(() => {
                                                router.reload();
                                            }, 100);
                                        }
                                    });
                                }}
                                className="w-full" 
                                colorScheme={'teal'}
                            >
                                <IoPencil className="mr-1"/>Update
                            </Button>
                        }
                        
                    </ModalFooter>
                </form>
            </div>
        );
        onOpen();
    }

    const deletePost = (id) => {
        setContentModal(
            <div>
                <ModalHeader>
                    <IoTrashBin className="mr-2"/>
                </ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    Delete this post ?
                </ModalBody>
                <ModalFooter>
                    {
                        (isLoading)?
                            <Button  className="w-full" disabled><DeleteIcon className="mr-1"/> Deleting it...</Button>
                        : 
                            <Button 
                                onClick={async ()=>{
                                    mutate({
                                        url : `https://paace-f178cafcae7b.nevacloud.io/api/post/delete/${id}`,
                                        method : "DELETE",
                                        headers : {
                                            Authorization : `Bearer ${Cookies.get("token")}`
                                        },
                                        onSuccess : () => {
                                            onClose();
                                            setTimeout(() => {
                                                router.reload();
                                            }, 100);
                                        }
                                    });
                                }}
                                className="w-full" 
                                colorScheme={'teal'}
                            >
                                <DeleteIcon className="mr-1"/> Delete
                            </Button>
                    }
                </ModalFooter>
            </div>
        );
        onOpen();
    }

    const replies = async (id) => {
        setContentModal(
            <div>
                <ModalHeader>
                    Replies
                </ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <Replies id={id} onClose={onClose}/>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </div>
        );
        onOpen();
    };

    const likes = async (id, isLikePost) => {

        const url = (isLikePost)?
            `https://paace-f178cafcae7b.nevacloud.io/api/unlikes/post/${id}`:
            `https://paace-f178cafcae7b.nevacloud.io/api/likes/post/${id}`

        const response = await fetch(url, 
            {
                method: "POST",
                headers : {
                    Authorization : `Bearer ${Cookies.get("token")}`
                }
            }
        )
        
        router.reload();

    };

    return (
        <Card className="mb-3">
            <CardHeader>
                <Flex gap={2}>
                    <Box>
                        <Avatar className="mt-3" name={user.name}/>
                    </Box>
                    <Box>
                        <Grid templateColumns='repeat(1,1fr)'>
                            <GridItem>
                                <span className="font-bold">
                                    {
                                        (is_own_post)?
                                        <span className="font-bold text-blue-700">{user.name}</span>
                                        : 
                                        <span>{user.name}</span>
                                    }
                                </span>
                            </GridItem>
                            <GridItem>
                                <span>{user.email}</span>
                            </GridItem>
                            <GridItem>
                                <span className="text-xs">
                                    {
                                        (moment(new Date).diff(moment(created_at,"YYYY-MM-DD"),'days') == 0)?
                                        `${(is_own_post)? "You Posting it today" : "Just Today" }`
                                        :
                                        `${moment(new Date).diff(moment(created_at,"YYYY-MM-DD"),'days')} day ago`
                                    }
                                
                                </span>
                            </GridItem>
                        </Grid>
                    </Box>
                    <Box className="w-full">
                        {
                            (is_own_post)?
                                <Menu className="bg-gray-100">
                                    <MenuButton className="float-right hover:text-blue-700 hover:cursor-pointer">
                                        <CiMenuKebab/>
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem onClick={()=>{deletePost(id)}}><DeleteIcon className="mr-2"/> Delete</MenuItem>
                                        <MenuItem onClick={()=>{editPost(id, description)}}><EditIcon className="mr-2"/> Edit</MenuItem>
                                    </MenuList>                                
                                </Menu>
                                
                            : 
                            ""
                        }
                    </Box>
                </Flex>
            </CardHeader>
            <CardBody>
                {description}
            </CardBody>
            <CardFooter>
                <Flex className="w-full justify-center" gap={2}>
                    <Box onClick={()=>{likes(id,is_like_post)}} className="w-full flex hover:text-blue-700 hover:cursor-pointer">
                        {
                            (is_like_post)? 
                            <AiFillLike className="mt-1" color="blue"/> : 
                            <AiFillLike className="mt-1 "/>
                        }
                        
                        <span className={`ml-1 ${(is_like_post)? "text-blue-700" : "text-black" }`}>
                            {
                                (likes_count > 0)? `${likes_count}` : ""
                            } Likes
                        </span>
                    </Box>
                    <Spacer/>
                    <Box onClick={()=>{replies(id)}} className="hover:cursor-pointer hover:text-blue-700 w-full flex">
                            <IoChatboxEllipsesOutline className="mt-1 mr-1"/>
                            {
                                `${replies_count} Replies`
                            }
                    </Box>
                </Flex>
            </CardFooter>
        </Card>
    );
}