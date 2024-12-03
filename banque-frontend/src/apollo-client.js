import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Création de l'instance Apollo Client avec l'URL relative
const client = new ApolloClient({
  uri: '/graphql', // Utilisation du proxy pour rediriger vers http://localhost:8082/graphql
  cache: new InMemoryCache(),
  onError: ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, location, path }) =>
        console.error(`GraphQL Error: ${message}, Path: ${path}`)
      );
    }
    if (networkError) {
      console.error(`Network Error: ${networkError}`);
    }
  },
});

export default client;

