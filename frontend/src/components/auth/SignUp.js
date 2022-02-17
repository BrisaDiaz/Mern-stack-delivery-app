import Auth from "./Auth";
import SignupForm from "./SignupForm";
import { withError } from "../withError";

function SignUp() {
  return (
    <Auth>
      <SignupForm />
    </Auth>
  );
}

export default withError(SignUp);
