import { Mutation, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import cookie from 'cookie'

const CREATE_USER = gql`
    mutation Create($name: String!, $email: String!, $password: String!) {
        createUser(name: $name, authProvider: { email: { email: $email, password: $password }}) {
            id
        }
        signinUser(email: { email: $email, password: $password }) {
            token
    }
}
`

const RegisterBox = (props) => {
  let name, email, password

  return (
    <Mutation mutation={CREATE_USER} onCompleted={(data) => {
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
      {(create, { data, error }) => (
        <div>
          <form onSubmit={e => {
            e.preventDefault()
            e.stopPropagation()

            create({ variables: {
              name: name.value,
              email: email.value,
              password: password.value
            }})

            name.value = email.value = password.value = ''
          }}>
            { error && <p>Issue occured while registering :(</p> }
            <input name='name' placeholder='Name' ref={node => { name = node }} /><br />
            <input name='email' placeholder='Email' ref={node => { email = node }} /><br />
            <input name='password' placeholder='Password' ref={node => { password = node }} type='password' /><br />
            <button>Register</button>
          </form>
        </div>
      )}

    </Mutation>
  )
}

export default withApollo(RegisterBox)
