import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../schema/authSchema";
import { loginApi } from "../../services/authService";
import { useNavigate } from "react-router";
import { useNotification } from "../../context/notificationContext";
import { setToken } from "../../utils/authToken";

const Login = () => {
  const addNotification = useNotification();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    shouldFocusError: true,
    shouldUnregister: true,
  });
  const onSubmit = async (data) => {
    try {
      const res = await loginApi(data);
      if (res.status == 200) {
        setToken(res.data.token)
        navigate("/");
      } else {
        addNotification("اطلاعات وارد شده نامعتبر است", "error");
      }
    } catch {
      addNotification("مشکلی پیش آمده", "error");
    }
  };
  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow border-0" style={{ width: "420px" }}>
        <div className="card-body p-4">
          <h3 className="text-center mb-4">ورود به پنل مدیریت</h3>

          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">نام کاربری</label>

              <input
                {...register("phone")}
                type="text"
                className="form-control"
                placeholder=" نام کاربری یا ایمیل"
              />
              {errors.phone && (
                <p className="text-danger mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">رمز عبور</label>

              <input
                {...register("password")}
                type="password"
                className="form-control"
                placeholder="رمز عبور"
              />
              {errors.password && (
                <p className="text-danger mt-1">{errors.password.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={!isDirty || !isValid || isSubmitting}
              className="btn btn-primary w-100"
            >
              ورود
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
