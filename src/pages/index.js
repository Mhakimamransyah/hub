import Posts from '@/components/posts';
import UseQuery from '@/hooks/use-query';
import Layout from '@/layout/layout';
import { WarningIcon } from '@chakra-ui/icons';
import { Box, Button, Divider, Flex, FormControl, Textarea, useDisclosure } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { IoFileTray, IoFilter, IoFilterCircle, IoText } from 'react-icons/io5';
import { ShimmerPostList } from 'react-shimmer-effects';

export default function Home() {
  
  const {error, isLoading, data}        = UseQuery("https://paace-f178cafcae7b.nevacloud.io/api/posts?type=all");
  const {isOpen, onOpen, onClose}       = useDisclosure();
  const Modal                           = dynamic(()=>import("@/components/modal"));
  const [contentModal, setContentModal] = useState(null);

  return (
    <Layout title={"home"} description={"hub homepage"}>
      <Modal children={contentModal} isOpen={isOpen} onClose={onClose}/>
      <div className='p-5'>
        <div className='mb-3 bg-white rounded-md'>
          <form>
            <FormControl>
              <Textarea placeholder='What do you think ?'></Textarea>
            </FormControl>
            <div className='p-3'>
            <FormControl>
                <Button h={5}><span className='text-xs'>posting now</span></Button>
              </FormControl>
            </div>
          </form>
        </div>
        <Flex className='mb-3' gap={2}>
          <Box className='flex w-fit p-2 rounded-lg hover:bg-green-100 hover:cursor-pointer bg-green-100'><IoFileTray className='mt-1 mr-1'/>all post</Box>
          <Box className='flex w-fit p-2 rounded-lg hover:bg-green-100 hover:cursor-pointer bg-blue-100'><IoText className='mt-1 mr-1'/>my post</Box>
        </Flex>
        {
          (isLoading) ?
            <ShimmerPostList col={1} row={8} postStyle={'STYLE_EIGHT'}/>
          :
            (error) ?
              <div className='h-screen justify-center text-center align-middle mt-10'>
                <WarningIcon className='mb-3' w={50} h={50}/>
                <p className='font-bold'>{error}</p>
              </div>
            :
              <div className='h-fit'>
                {
                  data.map((item) => {
                    return <Posts key={item.id} {...item} setContentModal={setContentModal} onClose={onClose} onOpen={onOpen}/>
                  })
                }
              </div>
        }
      </div>
      <br/>
      <br/>
    </Layout>
  )
}
