import Auth from "./Auth";
import SignUpForm from "./SignUpForm";
import { withError } from "../withError";

function SingUp() {
  return (
    <Auth>
      <SignUpForm />
    </Auth>
  );
}

export default withError(SingUp);
