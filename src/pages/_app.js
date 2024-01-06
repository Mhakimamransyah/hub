import { GlobalContextProvider } from '@/context/global-context'
import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  
  const router = useRouter();

  return (
    <ChakraProvider>
      {
        (router.pathname === "/login" || router.pathname === "/register")?
        <Component {...pageProps} />
        : 
        <GlobalContextProvider>
          <Component {...pageProps} />
        </GlobalContextProvider> 
      }
    </ChakraProvider>
  )
}
