import React from 'react'
import cookie from 'cookie'
import gql from "graphql-tag"
import { withApollo, compose, Query } from 'react-apollo'

import withData from '../lib/withData'
import MeBox from '../components/MeBox'
import SigninBox from '../components/SigninBox'
import Link from 'next/link'

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

const Index = props => (
  <>
    <MeBox client={props.client} />
    <hr />
    <SigninBox client={props.client} />
    <hr />
    New? <Link prefetch href='/create-account'><a>Create account</a></Link>
  </>
)

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  // withApollo exposes `props.client` used when logging out
  withApollo
)(Index)
