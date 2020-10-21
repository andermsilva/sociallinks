import React from 'react';
import Prismic from 'prismic-javascript';
import Head from 'next/head';
const Index = ({ data }) => {
    console.log('client')

    return (
        <div style={
            {
                backgroundColor: data.corfundo,
                color: data.cortexto

            }}>
               
            <Head>
                 <title>{data.titulo_da_pagina}</title>
            </Head>
            <div className=' w-1/2 mx-auto text-center' >

                 <h1 className='font-bold text-4xl p-8 '>{data.title}</h1>
                <img src={data.logo.url} className='mx-auto rounded-full shadow-2xl w-1/4' />
               
                    {data.body.map((item) => {
                //return<pre>{JSON.stringify(item,null,2)}</pre>
                        if (item.slice_type === 'secao') {
                            return <h2 className='font-bold text-2xl pt-4'>{item.primary.nome}</h2>
                        }
                        if (item.slice_type === 'link') {

                            return (
                                <div>
                                    <a className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 inline-block'
                                       href={item.primary.destino.url} target='blank'>
                                        {!item.primary.icon.url ? <img src={item.primary.icon.url} className='mx-auto' /> :
                                            item.primary.texto
                                        }
                                    </a>
                                </div>

                            );
                        }
                        if (item.slice_type === 'imagem') {
                            return (<img src={item.primary.imagem.url} className='mx-auto' />);
                        }
                        return null;
                    })}
               
                <pre>{/* JSON.stringify(data,null,2) */}</pre>
               
            <div className='text-center py-4'>

                Projeto  criado durante o evento Dev10k do <a href='https://devpleno.com'> DevePleno </a> <br />
                link disponivel em:
            </div>
            </div>
        </div>
    );

}
export async function getServerSideProps() {
    console.log('server');
    const client = Prismic.client('https://andermsilva.cdn.prismic.io/api/v2');
    const centralLinks = await client.getSingle('centrallinks');
    console.log(centralLinks);
    return {
        props: {
            data: centralLinks.data,
        }
    };
};

export default Index;