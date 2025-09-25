import { RouteItem } from "../types";
import LoginPage from "../../pages/login/LoginPage";
import RegisterPage from "../../pages/register/RegisterPage";
import OtpVerification from "../../components/otpVerification/OtpVerification";
import ForgotPassword from "../../components/resetPassword/ForgotPassword";
import CheckEmail from "../../components/resetPassword/CheckEmail";
import ResetPassword from "../../components/resetPassword/ResetPassword";
import ResetSuccess from "../../components/resetPassword/ResetSuccess";

const AuthPaths: RouteItem[] = [
  { path: "/login", Content: LoginPage },
  { path: "/register", Content: RegisterPage },
  { path: "/verify-otp", Content: OtpVerification },
  { path: "/forgot-password", Content: ForgotPassword },
  { path: "/check-email", Content: CheckEmail },
  { path: "/reset-password/:token", Content: ResetPassword },
  { path: "/reset-success", Content: ResetSuccess },
];

export default AuthPaths;
