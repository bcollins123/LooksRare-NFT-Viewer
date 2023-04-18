import Head from 'next/head';
import { useRouter } from 'next/router';

// import constants values
import {
    SEO_TITLE,
    SEO_DESCRIPTION,
    SEO_KEYWORDS,
} from '../constants';

// define the props of the this component
export type SEOProps = {
    title?: string;
    description?: string;
    keywords?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogUrl?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
};

// define component
export const SEO = ({
    description = SEO_DESCRIPTION,
    keywords = SEO_KEYWORDS,
    title = SEO_TITLE,
}: SEOProps) => {
    const router = useRouter();

    return (
        <Head>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:site_name" content={SEO_TITLE} />
            <meta property="og:type" content={'website'} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:card" content="summary_large_image" />
        </Head>
    );
};
