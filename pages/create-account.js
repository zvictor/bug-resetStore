import React from 'react'
import { compose } from 'react-apollo'
import Link from 'next/link'

import withData from '../lib/withData'
import redirect from '../lib/redirect'

import RegisterBox from '../components/RegisterBox'

const CreateAccount = props => (
  <>
    {/* RegisterBox handles all register logic. */}
    <RegisterBox client={props.client} />
    <hr />
    Already have an account? <Link prefetch href='/'><a>Sign in</a></Link>
  </>
)

export default compose( // TODO: Maybe remove the usage of compose?
  // withData gives us server-side graphql queries before rendering
  withData
)(CreateAccount)
