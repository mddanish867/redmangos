import withAdminAuth from '../HOC/withAdminAuth'

function AuthenticationTestAdmin() {
  return (
    <div className='pt-4'>
This page can be access by logged in if the role is ADMIN    </div>
  )
}

export default withAdminAuth(AuthenticationTestAdmin)
