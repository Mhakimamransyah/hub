import { Skeleton } from "@/layout/skeleton";
import Head from "next/head";
import { Alert, AlertDescription, AlertIcon,Button, FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import { ArrowBackIcon, InfoIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useMutatation } from "@/hooks/use-mutation";
import Link from "next/link";

export default function Register() {

    const {register,handleSubmit,formState:{errors},watch} = useForm();
    const router = useRouter();
    const {res, mutate, isLoading, error} = useMutatation();

    const onSubmit = (data) => {
        mutate({
            method : "POST",
            url : 'api/users',
            payload : JSON.stringify({
                name : data.name,
                email : data.email,
                password : data.password
            })
        })
    };

    return (
        <Skeleton>
            <div className="h-screen bg-blue-100">
                <Head>
                    <title>Register Hub Account</title>
                    <meta name="description" content="Register new account"/>
                </Head>
                <div className="p-8 ">
                        <div className="text-center">
                            <div className="flex">
                                <div className="mt-1 hover:cursor-pointer hover:text-blue-600">
                                    <ArrowBackIcon onClick={router.back}/>
                                </div>
                                <div className="flex-1 w-64">
                                    <h2 className="font-bold text-lg">Register new Account</h2>
                                </div>
                            </div>
                            <div className="mt-3 bg-white p-3 rounded-md">
                                {
                                    (error != null)? 
                                    <Alert status="error" className="mb-3 rounded-md">
                                        <AlertIcon/>
                                        <AlertDescription className="text-left">{error}</AlertDescription>
                                    </Alert>
                                    : 
                                    (res?.success) ?
                                    <Alert className="rounded-lg mb-3">
                                        <InfoIcon className="mr-2"/>
                                        <AlertDescription> Register success, please <Link className="font-bold hover:text-blue-500" href={'/login'}>login</Link> first</AlertDescription>
                                    </Alert> : ""
                                }
                                
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <FormControl>
                                        <FormLabel>Name</FormLabel>
                                        <Input 
                                            name="reg_name" autoComplete="off"
                                            {
                                                ...register(
                                                    "name", 
                                                    {
                                                        required : "Name is required",
                                                        minLength : {
                                                            message : "Name is too short",
                                                            value : 5
                                                        }
                                                    }
                                                )
                                            }
                                        />
                                        <FormHelperText className="text-left">{errors?.name?.message}</FormHelperText>
                                    </FormControl>

                                    <FormControl className="mt-5">
                                        <FormLabel>Email</FormLabel>
                                        <Input 
                                            name="reg_email" autoComplete="off"
                                            {
                                                ...register(
                                                    "email", 
                                                    {
                                                        required : "Email Address is required",
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
                                            name="reg_password" type="password" autoComplete="off"
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

                                    <FormControl className="mt-5">
                                        <FormLabel>Confirm Password</FormLabel>
                                        <Input 
                                            name="reg_confirm_password" type="password" autoComplete="off"
                                            {
                                                ...register(
                                                    "password_confirmation",
                                                    {
                                                        required : "Confirmation Password is required",
                                                        validate : (data) => {
                                                            if (watch('password') != data) {
                                                                return "Password and Confirm Password must same";
                                                            }
                                                        }
                                                    }
                                                )
                                            }
                                        />
                                        <FormHelperText className="text-left">{errors?.password_confirmation?.message}</FormHelperText>
                                    </FormControl>

                                    <FormControl>
                                        {
                                            (isLoading) ? 
                                            <Button className="w-full mt-6" disabled>
                                                Registering...
                                            </Button> 
                                            : 
                                            <Button type="submit" className="w-full mt-6" colorScheme={'blue'}>
                                                Register
                                            </Button> 
                                        }
                                    </FormControl>
                                </form>
                            </div>
                        </div>
                    </div>
            </div>
        </Skeleton>
    );
}