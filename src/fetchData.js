const gql = require('graphql-tag')
const { GraphQLWrapper } = require('@aragon/connect-thegraph')
const dotenv = require('dotenv')

dotenv.config()

const SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/1hive/uniswap-v2'

const PRICE_QUERY = gql`
  query {
    token(id: "${process.env.TOKEN_ID}") {
      derivedETH
      symbol
    }
  }
`

const fetchData = async () => {
  const graphqlClient = new GraphQLWrapper(SUBGRAPH_URL)
  const result = await graphqlClient.performQuery(PRICE_QUERY)

  if (!result.data) return undefined
  return result
}

exports.getTokenPrice = async () => {
  const res = await fetchData()
  const price = parseFloat(res.data.token.derivedETH).toFixed(5)
  return price
}

exports.getTokenSymbol = async () => {
  const res = await fetchData()
  return res.data.token.symbol
}
