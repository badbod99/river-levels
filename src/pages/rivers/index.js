import * as React from 'react';
import Layout from '../../components/layout';
import { Link, graphql } from 'gatsby'

const Rivers = ({ data }) => {
  return (
    <Layout pageTitle="All Rivers">
      {
        data.allMdx.nodes.map((node) => (
          <article key={node.id}>
            <h2>
              <Link to={`/rivers/${node.slug}`}>
                {node.frontmatter.title}
              </Link>
            </h2>
            <p>Posted: {node.frontmatter.date}</p>
          </article>
        ))
      }
    </Layout>
  )
};

export const query = graphql`{
  allMdx(sort: {fields: frontmatter___date, order: DESC}) {
    nodes {
      frontmatter {
        date(formatString: "MMMM D, YYYY")
        title
      }
      id
      slug
    }
  }
}`;

export default Rivers;