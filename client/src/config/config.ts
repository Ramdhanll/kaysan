console.log('ASda', process.env.REACT_APP_API_URL)

const config = {
   server: {
      url: process.env.REACT_APP_API_URL
         ? `${process.env.REACT_APP_API_URL}`
         : `http://localhost:${9090}`,
   },
}

export default config
