import * as React from 'react';
import Layout from '../components/layout';
import { graphql } from 'gatsby'
const Rivers = ({ data }) => {
  return (
    <Layout pageTitle="All Rivers">
      <ul>
      {
        data.allFile.nodes.map(node => (
          <li key={node.name}>
            {node.name}
          </li>
        ))
      }
      </ul>
    </Layout>
  )
};

export const query = graphql`{
  site(siteMetadata: {title: {}}) {
    id
    siteMetadata {
      title
    }
  }
  allFile(filter: {sourceInstanceName: {eq: "rivers"}}) {
    nodes {
      name
    }
  }
}`;
export default Rivers;