import { useEffect, useState } from 'react'
import useBoats from '@hooks/useBoats'
import { useParams } from 'react-router-dom'

const Listing = () => {
  const { getSingleBoat } = useBoats()
  const { boat_id } = useParams()
  const [boat, setBoat] = useState({})
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState(null)

  useEffect(() => {
    setLoading(true)
    const fetchBoat = async () => {
      const { data, error } = await getSingleBoat(boat_id)
      if (error) setServerError(error)
      if (data) setBoat(data)
      setLoading(false)
      return
    }
    fetchBoat()
  }, [])

  const handleReservation = () => {
    console.log('comming soon')
  }

  return loading ? (
    <>Loading...</>
  ) : (
    <div className='min-h-lvh w-full'>
      {serverError && (
        <div className='text-md m-6 text-red-400'>{serverError.message}</div>
      )}
      <main>
        <div>{JSON.stringify(boat)}</div>
        <button onClick={() => handleReservation()}>Rent</button>
      </main>
    </div>
  )
}

export default Listing
