import Posts from '@/components/posts';
import UseQuery from '@/hooks/use-query';
import Layout from '@/layout/layout';
import { WarningIcon } from '@chakra-ui/icons';
import { Button, Container, FormControl, Textarea } from '@chakra-ui/react';
import { ShimmerPostList } from 'react-shimmer-effects';

export default function Home() {
  
  const {error, isLoading, data} = UseQuery("https://paace-f178cafcae7b.nevacloud.io/api/posts?type=all");

  return (
    <Layout title={"home"} description={"hub homepage"}>
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
                    return <Posts {...item}/>
                  })
                }
              </div>
        }
      </div>
      <br/>
      <br/>
      <br/>
    </Layout>
  )
}
