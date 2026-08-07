import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useOutletContext } from "react-router";

import DateObject from "react-date-object";
import gregorian from "react-date-object/calendars/gregorian";

import Modal from "../../../components/common/Modal";
import FormController from "../../../components/forrms/FormController";
import SubmitButton from "../../../components/forrms/SubmitButton";
import {
  createUsersService,
  getRolesService,
  updateUsersService,
} from "../../../services/userService";
import { useNotification } from "../../../context/notificationContext";
import { userCreateSchema, userEditSchema } from "../../../schema/userSchema";
import { convertShamsiToGregorian } from "../../../utils/formatDate";

const AddUser = () => {
  const [roles, setRoles] = useState([]);

  const { setData } = useOutletContext();

  const addNotification = useNotification();

  const location = useLocation();

  const user = location.state?.data;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(user ? userEditSchema : userCreateSchema),
    mode: "onChange",
    shouldFocusError: true,
    shouldUnregister: true,

    defaultValues: {
      user_name: "",
      first_name: "",
      last_name: "",
      phone: "",
      national_code: "",
      email: "",
      password: "",
      birth_date: null,
      gender: "",
      roles_id: [],
    },
  });

  useEffect(() => {
    const getRoles = async () => {
      try {
        const res = await getRolesService();

        if (res.status === 200) {
          setRoles(
            res.data.data.map((role) => ({
              value: role.id,
              label: role.title,
            })),
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    getRoles();
  }, []);

  useEffect(() => {
    if (!user) return;

    reset({
      user_name: user.user_name || "",

      first_name: user.first_name || "",

      last_name: user.last_name || "",

      phone: user.phone || "",

      national_code: user.national_code || "",

      email: user.email || "",

      password: "",

      birth_date: user.birth_date
        ? new DateObject({
            date: user.birth_date,
            calendar: gregorian,
          })
        : null,

      gender: user.gender === null ? "" : Number(user.gender),

      roles_id: user.roles?.map((role) => role.id) || [],
    });
  }, [user, reset]);

  const onSubmit = async (formData) => {
    try {
      const payload = {
        ...formData,
        birth_date: convertShamsiToGregorian(formData.birth_date),
        gender: Number(formData.gender),
        roles_id: formData.roles_id || [],
      };

      // در حالت ویرایش اگر پسورد وارد نشده، برای API ارسال نشود
      if (user && !payload.password) {
        delete payload.password;
      }

      let res;

      if (user) {
        res = await updateUsersService(user.id, payload);
      } else {
        res = await createUsersService(payload);
      }

      if (res.status === 200 || res.status === 201) {
        addNotification(
          "success",
          user ? "کاربر با موفقیت ویرایش شد" : "کاربر با موفقیت ایجاد شد",
        );

        if (user) {
          setData((oldData) =>
            oldData.map((item) => (item.id === user.id ? res.data.data : item)),
          );
        } else {
          setData((oldData) => [...oldData, res.data.data]);
        }
      } else {
        const currentError = Object.values(res.data)[0];
        addNotification("error", currentError[0] || "خطایی رخ داده");
      }
    } catch (error) {
      console.log(error);
      addNotification("error", "خطایی رخ داده");
    }
  };

  return (
    <>
      <Modal
        title={user ? "ویرایش کاربر" : "افزودن کاربر"}
        id="add_user_modal"
        isOpen={true}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container">
            <div className="row justify-content-center">
              <FormController
                control="input"
                type="text"
                label="نام کاربری"
                error={errors.user_name?.message}
                className="col-md-6 col-lg-8 w-100"
                {...register("user_name")}
                placeholder="نام کاربری را وارد کنید"
              />

              <FormController
                control="input"
                type="text"
                label="نام"
                error={errors.first_name?.message}
                className="col-md-6 col-lg-8 w-100"
                {...register("first_name")}
                placeholder="نام را وارد کنید"
              />

              <FormController
                control="input"
                type="text"
                label="نام خانوادگی"
                error={errors.last_name?.message}
                className="col-md-6 col-lg-8 w-100"
                {...register("last_name")}
                placeholder="نام خانوادگی را وارد کنید"
              />

              <FormController
                control="input"
                type="text"
                label="شماره موبایل"
                error={errors.phone?.message}
                className="col-md-6 col-lg-8 w-100"
                {...register("phone")}
                placeholder="مثال: 09123456789"
              />

              <FormController
                control="input"
                type="text"
                label="کد ملی"
                error={errors.national_code?.message}
                className="col-md-6 col-lg-8 w-100"
                {...register("national_code")}
                placeholder="کد ملی را وارد کنید"
              />

              <FormController
                control="input"
                type="email"
                label="ایمیل"
                error={errors.email?.message}
                className="col-md-6 col-lg-8 w-100"
                {...register("email")}
                placeholder="ایمیل را وارد کنید"
              />

              <FormController
                control="input"
                type="password"
                label="رمز عبور"
                error={errors.password?.message}
                className="col-md-6 col-lg-8 w-100"
                {...register("password")}
                placeholder={
                  user
                    ? "برای عدم تغییر رمز عبور، خالی بگذارید"
                    : "رمز عبور را وارد کنید"
                }
              />

              <FormController
                control="date"
                name="birth_date"
                formControl={control}
                label="تاریخ تولد"
                error={errors.birth_date?.message}
                className="col-md-6 col-lg-8 w-100"
              />

              <FormController
                control="select"
                label="جنسیت"
                error={errors.gender?.message}
                className="col-md-6 col-lg-8 w-100"
                {...register("gender")}
                options={[
                  {
                    value: 1,
                    title: "مرد",
                  },
                  {
                    value: 0,
                    title: "زن",
                  },
                ]}
              />

              <FormController
                control="multiSelect"
                name="roles_id"
                label="نقش‌ها"
                formControl={control}
                options={roles}
                error={errors.roles_id?.message}
                className="col-md-6 col-lg-8 w-100"
              />

              <SubmitButton
                isDirty={isDirty}
                isValid={isValid}
                isSubmitting={isSubmitting}
                title="ذخیره"
              />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddUser;
