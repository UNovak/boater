import Sidebar from '@components/Sidebar'
import useStore from '@utils/Store'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  const host = useStore((state) => state.user.host)

  return (
    <div className='flex h-screen'>
      <Sidebar type={host ? 'host' : 'user'} />
      <div className='flex-grow overflow-y-auto'>
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard
