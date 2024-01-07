import UseQuery from "@/hooks/use-query";
import Layout from "@/layout/layout";
import { CalendarIcon } from "@chakra-ui/icons";
import { Avatar, Box, Card, CardBody, Divider, Flex } from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useState } from "react";

export default function Notification() {

    const [notifByDate, setNotifByDate] = useState([]);
    const {data, isLoading} = UseQuery(`${process.env.NEXT_PUBLIC_ENDPOINT}/notifications`);

    useEffect(
        ()=>{
            
            let tmp = [];

            (data?.map(item => {
                if(tmp[moment(item.created_at,"YYYY-M-D").format("DD MMMM YYYY")] === undefined) {
                    tmp[moment(item.created_at,"YYYY-M-D").format("DD MMMM YYYY")] = [item]
                } else {
                    tmp[moment(item.created_at,"YYYY-M-D").format("DD MMMM YYYY")].push(item);
                }
            }));

            setNotifByDate(tmp);
        },
        [isLoading]
    );

    return (
        <Layout title={'notification'} description={'hub notifications'}>
            <div className="mb-5">
                <div className={`p-3 text-sm h-full`}>
                    {
                        
                        Object.keys(notifByDate).map((key, idx)=>{
                            return (
                                <div className="mb-5">
                                    <div className="mb-2">
                                        <Flex gap={3}>
                                            <Box flex={3}></Box>
                                            <Box flex={3} className=" text-center">
                                                <CalendarIcon className="mr-1"/> {key}
                                            </Box>
                                        </Flex>
                                    </div>
                                    <div>
                                        {
                                            notifByDate[key]?.map(item => {
                                                return (
                                                    <div className="mb-2">
                                                        <Card>
                                                            <CardBody>
                                                                <Flex gap={2}>
                                                                    <Flex className="bg-blue-100 p-2 rounded-2xl" gap={2}>
                                                                        <Box>
                                                                            <Avatar height={10} width={10} name={item?.user?.name}/>
                                                                        </Box>
                                                                        <Box className="mt-2">
                                                                            {item?.user?.name}
                                                                        </Box>
                                                                    </Flex>
                                                                    <Box className="mt-4">
                                                                        <div>{`${item?.remark} your post`}</div>
                                                                    </Box>
                                                                    <Box className="mt-4">
                                                                        <div>{`${
                                                                            (moment(new Date).diff(moment(item?.created_at,"YYYY-MM-DD"),'days') == 0)?
                                                                                "today":
                                                                            `${moment(new Date).diff(moment(item?.created_at,"YYYY-MM-DD"),'days')} days ago`
                                                                        }`}</div>
                                                                    </Box>
                                                                </Flex>
                                                            </CardBody>
                                                        </Card>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                <br/>
            </div>
        </Layout>
    );
}