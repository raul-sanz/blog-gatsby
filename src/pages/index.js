import React,{useState} from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faThLarge,
  faList,
} from '@fortawesome/free-solid-svg-icons'

const Blog = () => {
  const [view, setView] = useState('grid')
  const data = useStaticQuery(
    graphql`
      query {
        allContentfulBlogPost(sort: { fields: publishedDate, order: DESC }) {
          edges {
            node {
              title
              id
              slug
              publishedDate(formatString: "Do MMMM, YYYY")
              featuredImage {
                fluid(maxWidth: 750) {
                  ...GatsbyContentfulFluid
                }
              }
              excerpt {
                childMarkdownRemark {
                  excerpt(pruneLength: 150)
                }
              }
            }
          }
        }
      }
    `
  )
  return (
    <Layout>
      <SEO title="Blog" />
      <div>
        <p className="text-center font-thin text-md border border-gray-200">Bienvenido a mi blog personal, en el cual encontraras temas relacionado con la programación web y algo mas y mas y mas</p>
      </div>
      <div className="flex justify-end px-12">
        {view == 'grid' && <button className="bg-white shadow-md px-4 py-1 rounded-full hover:bg-gray-200" onClick={()=>{setView('list')}}>Ver en lista <FontAwesomeIcon icon={faList} size="1x" /></button>}
        {view == 'list' && <button className="bg-white shadow-md px-4 py-1 rounded-full hover:bg-gray-200" onClick={()=>{setView('grid')}}>Ver en Gids <FontAwesomeIcon icon={faThLarge} size="1x" /></button>}
      </div>
      <ul className={`posts ${view == 'grid'?' grid gap-4 grid-cols-4':''}`}>
        {data.allContentfulBlogPost.edges.map(edge => {
          return (
            <li className={`shadow-lg p-4 ${view == 'list'? 'flex':''} `} key={edge.node.id}>
              <div className={view == 'list'?'w-1/3':''}>
                {edge.node.featuredImage && (
                  <Img
                    className="rounded-lg h-48"
                    fluid={edge.node.featuredImage.fluid}
                    alt={edge.node.title}
                  />
                )}
              </div>
              <div className={`px-5 ${view == 'list'?'w-2/3 ':''}`}>
                <h2 className="font-bold mt-4 text-center">
                  <span to={`/${edge.node.slug}/`}>{edge.node.title}</span>
                </h2>
                <div className="meta">
                  <span>Posted on {edge.node.publishedDate}</span>
                </div>

                <p className="excerpt ">
                  {edge.node.excerpt.childMarkdownRemark.excerpt}
                </p>

                <div className="button">
                  <Link to={`/blog/${edge.node.slug}/`}>Leer Mas</Link>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default Blog
 