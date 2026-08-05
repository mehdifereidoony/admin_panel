import { useForm } from "react-hook-form";
import Modal from "../../../components/common/Modal";
import { Controller } from "react-hook-form";
import PermissionSelector from "./PermissionSelector";
import FormController from "../../../components/forrms/FormController";
import SubmitButton from "../../../components/forrms/SubmitButton";
import { useEffect, useState } from "react";
import {
  createRolesService,
  getPermissionsService,
} from "../../../services/userService";
import { useNotification } from "../../../context/notificationContext";
import { useOutletContext } from "react-router";

const AddRole = () => {
  const [permissions, setPermissions] = useState([]);
  const addNotification = useNotification();
  const { setData } = useOutletContext();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({});

  useEffect(() => {
    const getRoles = async () => {
      try {
        const res = await getPermissionsService();
        if (res.status === 200) {
          setPermissions(
            res.data.data.map((p) => ({ id: p.id, title: p.description })),
          );
        }
      } catch {
        addNotification("error", "مکشلی پیش آمده");
      }
    };

    getRoles();
  }, []);

  const onSubmit = async (formData) => {
    try {
      const res = await createRolesService(formData);
      if (res.status == 201) {
        addNotification("success", "نقش جدید با موفقیت اضاف شد");
        setData((oldData) => [...oldData, res.data.data]);
      } else {
        addNotification("error", "مکشلی پیش آمده");
      }
    } catch {
      addNotification("error", "مکشلی پیش آمده");
    }
  };

  return (
    <>
      <Modal title="" fullScreen={true} id="add_role_modal" isOpen={true}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container">
            <div className="row justifyContent-center">
              <FormController
                control="input"
                type="text"
                label="عنوان"
                error={errors.title?.message}
                className="col-md-6 col-lg-8 w-100"
                {...register("title")}
                placeholder="عنوان را وارد کنید"
              />
              <FormController
                control="textarea"
                type="text"
                label="توضیحات"
                error={errors.description?.message}
                className="col-md-6 col-lg-8 w-100"
                placeholder="توضیحات را وارد کنید"
                {...register("description")}
              />
              <Controller
                name="permissions_id"
                control={control}
                render={({ field }) => (
                  <PermissionSelector
                    permissions={permissions}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.permissions_id?.message}
                  />
                )}
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

export default AddRole;
