import { NextSeo, NextSeoProps } from 'next-seo'
import { FC } from 'react'

// Mainly used SEO Props, generally used in pages you use
// If you create a page, please refer to using this
// Use case: <SEO title="Login" />
// Will result the title to be: Login | Vitio
interface MainlyUsedSEOProps {
  title?: string
}

type SEOProps = MainlyUsedSEOProps & Omit<NextSeoProps, 'title'>

const SEO: FC<SEOProps> = ({ title, ...other }) => {
  return <NextSeo title={title} {...other} />
}

export default SEO
