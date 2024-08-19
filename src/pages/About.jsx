import Icon from '@components/Icon'

const About = () => {
  return (
    <div className='h-screen'>
      <div className='grid w-full gap-4 p-8'>
        <h1 className='text-3xl font-bold text-gray-900'>
          About Project Boater
        </h1>

        <p className='text-lg leading-relaxed text-gray-700'>
          The web app was created as the final project for the Systems 3 course
          at UP Famnit.
        </p>

        <p className='text-lg leading-relaxed text-gray-700'>
          The goal of the project was to build a full-stack web app using
          different technologies. The app is built using React as the frontend
          framework of choice, routing is managed with React Router, and the
          backend is handled through Supabase.
        </p>

        <div className='mt-6 flex flex-col items-center justify-center'>
          <span className='mb-2 text-lg text-gray-800'>
            The source code is available on GitHub:
          </span>

          <a
            href='https://github.com/UNovak/boater/tree/main'
            className='group flex items-center space-x-2'
            target='_blank'
            rel='noopener noreferrer'>
            <Icon
              type='Github'
              className='h-10 w-10 transition-opacity duration-200 ease-in-out group-hover:opacity-80'
            />
            <span className='sr-only'>Github repository link</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default About
