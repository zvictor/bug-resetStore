import React from 'react'
import cookie from 'cookie'
import gql from "graphql-tag"
import { withApollo, Query } from 'react-apollo'

const GET_USER = gql`
  query {
    allUsers {
      id
      name
    }
  }
`;

const Network = props => (
  <Query query={GET_USER}>
    { ({ loading, error, data }) => (
      <>
        <h1>The network</h1>
        { data.allUsers && data.allUsers.map(({id, name}) => <div key={id}>{name}</div>) }
      </>
    ) }
  </Query>
)

export default withApollo(Network)
