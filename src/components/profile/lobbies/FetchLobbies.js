import useAxiosPrivate from '../../auth/api/useAxiosPrivate'
export default  async function FetchLobbies ( userId ) {
  const axiosPrivate = useAxiosPrivate()
        // Fetch data from the API
        const response =  await axiosPrivate.post('/game/lobbies', { userId}).then(response =>{
            console.log('api call',response)
        })
      return response
};
