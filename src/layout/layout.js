import Head from "next/head";
import { Skeleton } from "./skeleton";
import Header from "@/components/header";
import BottomMenuNav from "@/components/bottom-menu-nav";


export default function Layout({children, title, description}) {
    return (
        <Skeleton>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description}/>
            </Head>
            <Header/>
            {children}
            <BottomMenuNav/>
        </Skeleton>
    );
}