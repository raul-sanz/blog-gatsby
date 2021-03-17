import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Img from "gatsby-image"
import SEO from "../components/seo"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleLeft
} from '@fortawesome/free-solid-svg-icons'

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishedDate(formatString: "DD MMM YYYY")
      featuredImage {
        fluid(maxWidth: 750) {
          ...GatsbyContentfulFluid
        }
      }
      body {
        json
      }
    }
  }
`

const BlogPost = props => {
  const options = {
    renderNode: {
      "embedded-asset-block": node => {
        const alt = node.data.target.fields.title["en-US"]
        const url = node.data.target.fields.file["en-US"].url
        return <img alt={alt} src={url} />
      },
    },
  }

  return (
    <Layout>
      <SEO title={props.data.contentfulBlogPost.title} />
      <div className="p-4">
        <Link className="bg-red-500 text-white rounded-full px-4 py-1 ml-12 mt-2 hover:bg-white hover:text-red-500  hover:border-red-500" to="/"><FontAwesomeIcon icon={faAngleLeft} size="1x" /> Volver</Link>
        </div>
      <div className="flex justify-center ">
        <div className="w-1/2">
          <h1 className="text-center font-bold text-xl">{props.data.contentfulBlogPost.title}</h1>
          <span className="text-center block my-6">
            Publicado el {props.data.contentfulBlogPost.publishedDate}
          </span>

          {props.data.contentfulBlogPost.featuredImage && (
            <Img
              className="rounded-lg"
              fluid={props.data.contentfulBlogPost.featuredImage.fluid}
              alt={props.data.contentfulBlogPost.title}
            />
          )}

          <div className="py-10">
          {documentToReactComponents(
            props.data.contentfulBlogPost.body.json,
            options
          )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default BlogPost
