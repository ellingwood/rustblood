import React, { Fragment } from 'react'
import _get from 'lodash/get'
import { Link, graphql } from 'gatsby'
import { ChevronLeft } from 'react-feather'

import Content from '../components/Content'
import Layout from '../components/Layout'
import ServerInfo from '../components/ServerInfo'
import './SinglePost.css'

export const SingleServerTemplate = ({
  title,
  location,
  body,
  nextServerURL,
  prevServerURL,
  categories = [],
  serverId
}) => (
  <main>
    <article
      className="SinglePost section light"
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <div className="container skinny">
        <Link className="text-secondary" to="/servers">
          <ChevronLeft /> BACK
        </Link>
        <div className="SinglePost--Content relative">
          <div className="SinglePost--Meta">
            {location}
            <span> |</span>
            {categories && (
              <Fragment>
                {categories.map((cat, index) => (
                  <span
                    key={cat.category}
                    className="SinglePost--Meta--Category"
                  >
                    {cat.category}
                    {/* Add a comma on all but last category */}
                    {index !== categories.length - 1 ? ',' : ''}
                  </span>
                ))}
              </Fragment>
            )}
          </div>

          {title && (
            <h1 className="SinglePost--Title" itemProp="title">
              {title}
            </h1>
          )}

          <div className="SinglePost--InnerContent">
            <section className="section">
            <div className="container">
               <ServerInfo serverId={serverId} />
            </div>
            </section>
            <Content source={body} />
          </div>

          <div className="SinglePost--Pagination">
            {prevServerURL && (
              <Link
                className="SinglePost--Pagination--Link prev"
                to={prevServerURL}
              >
                Previous Server
              </Link>
            )}
            {nextServerURL && (
              <Link
                className="SinglePost--Pagination--Link next"
                to={nextServerURL}
              >
                Next Server
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  </main>
)

// Export Default SinglePost for front-end
const SingleServer = ({ data: { server, allServers } }) => {
  const thisEdge = allServers.edges.find(edge => edge.node.id === server.id)
  return (
    <Layout
      meta={server.frontmatter.meta || false}
      title={server.frontmatter.title || false}
    >
      <section className="section">
        <div className="container">
          <Content />
        </div>
      </section>

      <SingleServerTemplate
        {...server}
        {...server.frontmatter}
        body={server.html}
        nextServerURL={_get(thisEdge, 'next.fields.slug')}
        prevServerURL={_get(thisEdge, 'previous.fields.slug')}
        serverId={server.frontmatter.serverId}
      />
    </Layout>
  )
}

export default SingleServer

export const pageQuery = graphql`
  ## Query for SinglePost data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query SingleServer($id: String!) {
    server: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      id
      frontmatter {
        title
        template
        subtitle
        categories {
          category
        }
        serverId
        location
      }
    }

    allServers: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "servers" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
        }
        next {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
        previous {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
