import Icon from '@icons'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='footer bg-white p-10 text-neutral-content'>
      <aside>
        <Icon type='Logo' className='w-20' />
        <p>Perfect weekend ahead</p>
      </aside>
      <nav>
        <h6 className='footer-title'>Socials</h6>
        <div className='grid grid-flow-col gap-4'>
          <Link to={'#'}>
            <Icon type='Facebook' className='w-6' />
          </Link>
          <Link to={'#'}>
            <Icon type='Twitter' className='w-6' />
          </Link>
          <Link to={'#'}>
            <Icon type='Youtube' className='w-6' />
          </Link>
        </div>
      </nav>
    </footer>
  )
}

export default Footer
