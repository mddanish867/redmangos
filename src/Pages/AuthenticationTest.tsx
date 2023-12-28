import withAuth from '../HOC/withAuth'

function AuthenticationTest() {
  return (
    <div className='pt-4'>
      This page can be accessed by loged in user
    </div>
  )
}

export default withAuth(AuthenticationTest);
