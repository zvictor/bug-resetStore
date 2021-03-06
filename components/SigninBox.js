import { Mutation, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import cookie from 'cookie'

const SIGN_IN = gql`
    mutation Signin($email: String!, $password: String!) {
        signinUser(email: { email: $email, password: $password}) {
            token
        }
    }
`

// TODO: Find a better name for component.
const SigninBox = (props) => {
  let email, password

  return (
    // <Mutation mutation={SIGN_IN} refetchQueries={['getUser']} onCompleted={(data) => {
    <Mutation mutation={SIGN_IN} onCompleted={(data) => {
      // Store the token in cookie
      document.cookie = cookie.serialize('token', data.signinUser.token, {
        maxAge: 30 * 24 * 60 * 60 // 30 days
      })
      // Force a reload of all the current queries now that the user is
      // logged in
      console.log('resetStore started')
      props.client.resetStore().then(() => {
        console.log('resetStore finished')
      })
    }} onError={(error) => {
      // If you want to send error to external service?
      console.error(error)
    }}>
      {(signinUser, { data, error }) => (
        <div>
          <h1>Sign in</h1>
          <form onSubmit={e => {
            e.preventDefault()
            e.stopPropagation()

            signinUser({ variables: {
              email: email.value,
              password: password.value
            }})

            email.value = password.value = ''
          }}>
            { error && <p>No user found with that information.</p> }
            <input name='email' placeholder='Email' ref={node => { email = node }} /><br />
            <input name='password' placeholder='Password' ref={node => { password = node }} type='password' /><br />
            <button>Sign in</button>
          </form>
        </div>
      )}
    </Mutation>
  )
}

export default withApollo(SigninBox)
