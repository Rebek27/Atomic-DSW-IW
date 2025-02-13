import fondo from "../assets/images/IMG_20240727_111754996.jpg";

import LoginForm from "../components/loginReg/LoginForm";
import SingUpForm from "../components/loginReg/SingUpForm";

export default function Login() {
  const bgStyle = {
    backgroundImage: `url(${fondo})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <>
      <div className="h-[100vh] flex justify-center items-center "
        style={bgStyle}>
        <LoginForm />
        {/* <SingUpForm/> */}
      </div>
    </>
  );
}
  