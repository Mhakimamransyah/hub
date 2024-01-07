import { GlobalContext } from "@/context/global-context";
import Layout from "@/layout/layout";
import { CalendarIcon, EmailIcon, InfoOutlineIcon, PhoneIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/react";
import { useContext } from "react";

export default function Profile(){

    const {data} = useContext(GlobalContext);

    return(
        <Layout title={"Profiles"} description={"All about user profiles"}>
            <div className="h-screen border-x-4">
                <div className="text-center justify-center">
                    <Avatar className="mt-20" h={100} w={100} name={data?.data?.name}/>
                    <div className="bg-blue-100 p-1 mt-2 justify-center">
                        <p className="font-bold mt-2 text-lg">{data?.data?.name}</p>
                        <p className="text-md"><EmailIcon/> {data?.data?.email}</p>
                        {
                            (data?.data?.phone)? <p className="text-md"><PhoneIcon/> {data?.data?.phone}</p> : ""
                        }
                        {
                            (data?.data?.hobby)? <p className="text-md"><InfoOutlineIcon/> {data?.data?.hobby}</p> : ""
                        }
                        {
                            (data?.data?.dob)? <p className="text-md"><CalendarIcon/> {data?.data?.dob}</p> : ""
                        }
                    </div>
                </div>
            </div>
        </Layout>
    );
}