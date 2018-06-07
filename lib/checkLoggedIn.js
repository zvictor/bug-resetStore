import gql from 'graphql-tag'

export default (context, apolloClient) => (
  apolloClient.watchQuery({
    query: gql`
      query getUser {
        user {
          id
          name
        }
      }
    `
  }).then(({ data }) => {
    return { loggedInUser: data }
  }).catch(() => {
    // Fail gracefully
    return { loggedInUser: {} }
  })
)
