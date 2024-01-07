import { useMutatation } from "@/hooks/use-mutation";
import { Skeleton } from "@/layout/skeleton";
import { Alert, AlertDescription, AlertIcon, Button, FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import Cookies from "js-cookie";
import Head from "next/head";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export default function Login() {

    const router = useRouter();
    const {register, handleSubmit, formState:{errors}} = useForm();
    const {error, mutate, isLoading} = useMutatation();

    const onLogin = (data) => {
        
        mutate({
            method : "POST",
            url : "api/login",
            payload : JSON.stringify({
                email : data?.email,
                password : data?.password
            }),
            onSuccess : (result) => {
                Cookies.set('token',result?.data?.token,{expires: 1});
                router.replace("/");
            }
        });
    }

    return (
        <Skeleton>
            <Head>
                <title>Login to Hub</title>
                <meta name="description" content="Login to Hub"/>
            </Head>
            <div className="h-screen bg-blue-100 items-center justify-center flex">
                    <div className="text-center p-3">
                        <h2 className="font-bold text-lg">Login To Hub</h2>
                        <div className="mt-3 bg-white p-3 rounded-md">
                            {
                                (error)?
                                <Alert status="error" className="mb-3 rounded-md">
                                    <AlertIcon/>
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                                : 
                                ""
                            }
                            <form onSubmit={handleSubmit(onLogin)}>
                                <FormControl>
                                    <FormLabel>Email</FormLabel>
                                    <Input 
                                        {
                                            ...register(
                                                "email",
                                                {
                                                    required : "Email is required",
                                                    minLength : {
                                                        message : "Email is too short",
                                                        value : 10
                                                    }
                                                }
                                            )
                                        }
                                    />
                                    <FormHelperText className="text-left">{errors?.email?.message}</FormHelperText>
                                </FormControl>
                                <FormControl className="mt-5">
                                    <FormLabel>Password</FormLabel>
                                    <Input 
                                        type="password"
                                        {
                                            ...register(
                                                "password",
                                                {
                                                    required : "Password is required",
                                                    minLength : {
                                                        message : "Password is too short",
                                                        value : 5
                                                    }
                                                }
                                            )
                                        }
                                    />
                                    <FormHelperText className="text-left">{errors?.password?.message}</FormHelperText>
                                </FormControl>
                                <FormControl>
                                    {
                                        (isLoading) ?
                                        <Button className="w-full mt-6"  disabled>Login...</Button>
                                        :
                                        <Button className="w-full mt-6" type="submit" colorScheme={'blue'}>Login</Button>
                                    }
                                    
                                </FormControl>
                            </form>
                        </div>
                        <div className="mt-3">
                            <p> Dont have any account ? 
                                <Link className="text-black-200 font-bold hover:text-blue-700" href={'register'}> Register Now</Link></p>
                        </div>
                    </div>
                </div>
        </Skeleton>
    );
}