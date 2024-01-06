import { DragHandleIcon } from "@chakra-ui/icons";
import { Avatar, Box, Card, CardBody, CardFooter, CardHeader, Flex, Grid, GridItem, Spacer } from "@chakra-ui/react";
import moment from "moment";
import { AiFillLike } from "react-icons/ai";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";



export default function Posts({description, user, is_own_post, created_at, likes_count,is_like_post,replies_count}){
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
                                <span>
                                    {
                                        (moment(new Date).diff(moment(created_at,"YYYY-MM-DD"),'days') == 0)?
                                        "Just Today"
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
                                <CiMenuKebab className="float-end hover:text-blue-700 hover:cursor-pointer"/>
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
                    <Box className="w-full flex">
                        {
                            (is_like_post)? 
                            <AiFillLike className="mt-1" color="blue"/> : 
                            <AiFillLike className="mt-1 hover:text-blue-700 hover:cursor-pointer"/>
                        }
                        
                        <span className="ml-1">
                            {
                                (likes_count > 0)? `${likes_count}` : ""
                            } Likes
                        </span>
                    </Box>
                    <Spacer/>
                    <Box className="hover:cursor-pointer hover:text-blue-700 w-full flex">
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