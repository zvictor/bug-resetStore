import React from 'react'
import cookie from 'cookie'
import gql from "graphql-tag"
import { withApollo, Query } from 'react-apollo'
import Network from '../components/Network'

const GET_USER = gql`
  query getUser {
    user {
      id
      name
    }
  }
`;

const signout = props => {
  document.cookie = cookie.serialize('token', '', {
    maxAge: -1 // Expire the cookie immediately
  })

  console.log('resetStore started')
  props.client.resetStore().then(() => {
    console.log('resetStore finished')
  })
}

const MeBox = props => (
  <Query query={GET_USER}>
    {({ loading, error, data }) => {
      if (!data.user) {
        return null
      }

      return (
        <>
          <h1>Me</h1>
          Hello {data.user.name}!<br />
          <button onClick={() => signout(props)}>Sign out</button>
          <Network />
        </>
      )
    }}
  </Query>
)

export default withApollo(MeBox)
