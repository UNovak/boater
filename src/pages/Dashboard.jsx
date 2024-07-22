import Sidebar from '@components/dash/Sidebar'
import Host from '@components/dash/Host'
import User from '@components/dash/User'
import useStore from '@utils/Store'

const Dashboard = () => {
  const host = useStore((state) => state.user.host)

  return host ? (
    <div className='flex h-screen'>
      <Sidebar type={'host'} />
      <div className='flex-grow'>
        <Host />
      </div>
    </div>
  ) : (
    <div className='flex h-screen'>
      <Sidebar type={'user'} />
      <div className='flex-grow'>
        <User />
      </div>
    </div>
  )
}

export default Dashboard
