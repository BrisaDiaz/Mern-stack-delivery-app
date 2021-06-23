import Auth from './Auth'
import SingupForm from './SingupForm'
import { withError } from './../withError'

function SingUp(){


return(
<Auth>
<SingupForm/>
</Auth>

  )
}

export default withError(SingUp)