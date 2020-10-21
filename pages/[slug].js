import React, { useEffect } from 'react';
import Prismic from 'prismic-javascript';
import { useRouter } from 'next/router';
import Head from 'next/head';
const RedirectTo=()=>{
const router = useRouter();
    useEffect(()=>{
       
        setTimeout(() => {
               
                router.push('/');
                
        },2000);
        
        
    },[]);

    return (
        <div className='w-1/2 mx-auto text-center mt-8'>
            <Head>
                <title>Pagian não encontrada</title>
            </Head>

            <h1 className='font-bold text-4xl'>URL não encontrada.</h1>
            <p> Estamos redeirecionando você pra a central de Links</p>
        </div>
    );
};

export async function getServerSideProps({params,res}){
  
    const client = Prismic.client('https://andermsilva.cdn.prismic.io/api/v2');
    const link = await client.getByUID('shortlink',params.slug);
    if(link){
        res.statusCode = 301;
        res.setHeader('Location',link.data.destino.url);
        res.end();
        return null;
    }
    return{
        props:{},
    };
}

export default RedirectTo;