import { useMutatation } from "@/hooks/use-mutation";
import UseQuery from "@/hooks/use-query";
import { DeleteIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Card, CardBody, Flex, Textarea, VStack } from "@chakra-ui/react";
import Cookies from "js-cookie";
import moment from "moment";
import { useRouter } from "next/router";
import { useRef } from "react";

export default function Replies({id, onClose}) {

    const {isLoading, data} = UseQuery(`https://paace-f178cafcae7b.nevacloud.io/api/replies/post/${id}`);
    const replies = useRef();
    const {mutate} = useMutatation();
    const router = useRouter();

    const submitReplies = () => {  
        if(replies.current.value) {
            mutate({
                url : `https://paace-f178cafcae7b.nevacloud.io/api/replies/post/${id}`,
                method : "POST",
                payload : JSON.stringify({
                    description : replies.current.value
                }),
                headers : {
                    Authorization : `Bearer ${Cookies.get("token")}`
                },
                onSuccess : () => {
                    onClose();
                    setTimeout(() => {
                        router.reload();
                    }, 500);
                }
            });
        }
    }

    const deleteReplies = (idReplies) => {
        mutate({
            url : `https://paace-f178cafcae7b.nevacloud.io/api/replies/delete/${idReplies}`,
            method : "DELETE",
            headers : {
                Authorization : `Bearer ${Cookies.get("token")}`
            },
            onSuccess : () => {
                onClose();
                setTimeout(() => {
                    router.reload();
                }, 500);
            }
        });
    }

    return (
        <div>
            <div className="mb-5">
                <div>
                    <Textarea ref={replies} placeholder="Reply this post"></Textarea>
                </div>
                <div className="mt-3">
                    <Button onClick={submitReplies} className="w-full" colorScheme={'teal'}>Reply</Button>
                </div>
            </div>
            {
                (isLoading)? 
                    "Loading..." : 
                    <div className="max-h-80 overflow-scroll overflow-x-hidden p-3">
                    {
                        (data).map(item => {
                            return(
                                <Card className="mt-3 shadow-lg">
                                    <CardBody>
                                        <VStack className="float-left">
                                            <Flex className="text-left" gap={3}>
                                                <Box className="w-full">
                                                    <Avatar className="mt-1" name={item?.user?.name}/>
                                                </Box>
                                                <Box flex={1}>
                                                    <div className="text-xs font-bold">{item?.user?.name}</div>
                                                    <div className="text-xs">{item?.user?.email}</div>
                                                    <div className="text-xs">
                                                        {
                                                            (moment(new Date).diff(moment(item?.created_at,"YYYY-MM-DD"),'days') == 0)?
                                                            "Just Today"
                                                            :
                                                            `${moment(new Date).diff(moment(item?.created_at,"YYYY-MM-DD"),'days')} day ago`
                                                        }
                                                    </div>
                                                </Box>
                                            </Flex>
                                            <Box className="float-left w-full mt-5">
                                                {item.description}
                                            </Box>
                                            <Box className="w-full">
                                                {
                                                    (item?.is_own_reply)? 
                                                    <div onClick={()=>{deleteReplies(item.id)}} className="text-xs text-left mt-5 text-gray-300 hover:cursor-pointer hover:text-gray-700">
                                                        <DeleteIcon className="mb-1"/> delete this replies
                                                    </div>    
                                                    :
                                                    <span></span>
                                                }
                                                
                                            </Box>
                                        </VStack>                                
                                    </CardBody>
                                </Card>
                            );
                        })
                    }
                    </div>
            }
        </div>
    );
}