import Sidebar from '@components/Sidebar'
import Dashboard from '@components/Dashboard'

const Host = () => {
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className='flex-grow'>
        <Dashboard />
      </div>
    </div>
  )
}

export default Host
