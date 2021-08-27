import React from 'react'
import Layout from '../../components/layout'
import Date from '../../components/date'
import { getAllPostIds, getPostData  } from '../../lib/posts'
import Head from 'next/head';
import utilstyles from '../../styles/utils.module.scss'
import { GetStaticProps, GetStaticPaths } from 'next';

export default function Post(
    {postData} : 
    {postData : 
        {title : string, date : string, contentHtml : string}
    }) 
{
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <h1 className={utilstyles.headingx1}>{postData.title}</h1>
            <br/>
            <Date className={utilstyles.lightText} 
            dateString={postData.date}/>
            <br/>
            <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}/>
        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps : GetStaticProps = async ({params}) => {
    if(typeof(params.id) == 'string'){
        const postData = await getPostData(params.id);
        return {
            props: {
                postData
            }
        }
    }
}




