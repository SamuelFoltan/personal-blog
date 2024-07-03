import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import "./authentication.styles.scss";

const Authentication = () => {
  return (
    <div className="authentication-container">
      <div className="form-container">
        <SignInForm />
      </div>
      <div className="form-container">
        <SignUpForm />
      </div>
    </div>
  );
};

export default Authentication;