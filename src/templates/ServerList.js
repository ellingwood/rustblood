import React from 'react'
import { graphql } from 'gatsby'
import { Location } from '@reach/router'
import qs from 'qs'

import PageHeader from '../components/PageHeader'
import ServerSection from '../components/ServerSection'
import ServerListNav from '../components/ServerListNav'
import Layout from '../components/Layout'

/**
 * Filter posts by date. Feature dates will be fitered
 * When used, make sure you run a cronejob each day to show schaduled content. See docs
 *
 * @param {servers} object
 */
export const byDate = servers => {
  const now = Date.now()
  return servers.filter(server => Date.parse(server.date) <= now)
}

/**
 * filter posts by category.
 *
 * @param {servers} object
 * @param {title} string
 * @param {contentType} string
 */
export const byCategory = (servers, title, contentType) => {
  const isCategory = contentType === 'serverCategories'
  const byCategory = server =>
    server.categories &&
    server.categories.filter(cat => cat.category === title).length
  return isCategory ? servers.filter(byCategory) : servers
}

// Export Template for use in CMS preview
export const ServerListTemplate = ({
  title,
  subtitle,
  featuredImage,
  servers = [],
  serverCategories = [],
  enableSearch = true,
  contentType
}) => (
  <Location>
    {({ location }) => {
      let filteredServers =
        servers && !!servers.length
          ? byCategory(byDate(servers), title, contentType)
          : []

      let queryObj = location.search.replace('?', '')
      queryObj = qs.parse(queryObj)

      if (enableSearch && queryObj.s) {
        const searchTerm = queryObj.s.toLowerCase()
        filteredServers = filteredServers.filter(server =>
          server.frontmatter.title.toLowerCase().includes(searchTerm)
        )
      }

      return (
        <main className="Blog">
          <PageHeader
            title={title}
            subtitle={subtitle}
            backgroundImage={featuredImage}
          />

          {!!serverCategories.length && (
            <section className="section thin">
              <div className="container">
                <ServerListNav enableSearch categories={serverCategories} />
              </div>
            </section>
          )}

          {!!servers.length && (
            <section className="section">
              <div className="container">
                <ServerSection servers={filteredServers} />
              </div>
            </section>
          )}
        </main>
      )
    }}
  </Location>
)

// Export Default BlogIndex for front-end
const ServerList = ({ data: { page, servers, serverCategories } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <ServerListTemplate
      {...page}
      {...page.fields}
      {...page.frontmatter}
      servers={servers.edges.map(server => ({
        ...server.node,
        ...server.node.frontmatter,
        ...server.node.fields
      }))}
      serverCategories={serverCategories.edges.map(server => ({
        ...server.node,
        ...server.node.frontmatter,
        ...server.node.fields
      }))}
    />
  </Layout>
)

export default ServerList

export const pageQuery = graphql`
  ## Query for BlogIndex data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query ServerList($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      fields {
        contentType
      }
      frontmatter {
        title
        excerpt
        template
        subtitle
        featuredImage
      }
    }

    servers: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "servers" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date
            categories {
              category
            }
            featuredImage
          }
        }
      }
    }
    serverCategories: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "serverCategories" } } }
      sort: { order: ASC, fields: [frontmatter___title] }
    ) {
      edges {
        node {
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
