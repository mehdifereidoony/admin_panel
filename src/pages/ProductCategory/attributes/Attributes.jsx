import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import {
  createAttributesService,
  editAttributesService,
  getAttributesService,
} from "../../../services/attributes";
import { useNotification } from "../../../context/notificationContext";
import DataTable from "../../../components/common/DataTable";
import InFilter from "./components/InFilter";
import PrevPageButton from "../../../components/common/PrevPageButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { attributeSchema } from "../../../schema/attributeSchema";
import FormController from "../../../components/forrms/FormController";
import SubmitButton from "../../../components/forrms/SubmitButton";
import Actions from "./components/Actions";

const Attributes = () => {
  const location = useLocation();
  const addNotification = useNotification();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [edited, setEdited] = useState(null);
  const itemsInTable = [
    { field: "id", title: "#" },
    { field: "title", title: "نام" },
    { field: "unit", title: "واحد" },
  ];
  const additionalColumn = [
    {
      title: "نمایش در فیلتر",
      value: (data) => <InFilter in_filter={data.in_filter} />,
    },
    {
      title: "عملیات",
      value: (data) => (
        <Actions data={data} edited={edited} setEdited={setEdited} />
      ),
    },
  ];
  useEffect(() => {
    const getAttribute = async (id) => {
      try {
        const res = await getAttributesService(id);
        if (res.status == 200) {
          setData(res.data.data);
        } else {
          addNotification("error", res.data.title || "خطایی رخ داده");
        }
      } catch {
        addNotification("error", "خطایی رخ داد");
      } finally {
        setIsLoading(false);
      }
    };
    getAttribute(location.state.parentData.id);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(attributeSchema),
    mode: "onChange",
    shouldFocusError: true,
    shouldUnregister: true,
  });

  const onSubmit = async (formData) => {
    try {
      let res;
      if (!edited) {
        res = await createAttributesService(location.state.parentData.id, {
          ...formData,
          in_filter: formData.in_filter ? 1 : 0,
        });
      } else {
        res = await editAttributesService(edited.id, {
          ...formData,
          in_filter: formData.in_filter ? 1 : 0,
        });
      }
      if (res.status == 201) {
        addNotification("success", "ویژگی با موفقیت اضاف شد");
        setData((oldData) => [
          ...oldData,
          {
            id: res.data.data.id,
            title: res.data.data.title,
            unit: res.data.data.title,
            in_filter: res.data.data.in_filter ? true : false,
          },
        ]);
        reset();
      } else if (res.status == 200) {
        addNotification("success", "ویژگی با موفقیت ویرایش شد");
        console.log(data);
        const index = data.findIndex((d) => {
          return d.id === edited.id;
        });
        setData((oldData) => {
          const newData = [...oldData];
          newData[index] = res.data.data;
          return newData;
        });
        setEdited(null);
        console.log(index);
      } else {
        console.log(res);
        addNotification("error", res.data.title || "مشکلی پیش آمده");
      }
    } catch (error) {
      console.log(error);
      addNotification("error", "مشکلی پیش  آمده");
    }
  };
  useEffect(() => {
    if (edited) {
      reset({
        title: edited.title,
        unit: edited.unit,
        in_filter: edited.in_filter ? true : false,
      });
    } else {
      reset({
        title: "",
        unit: "",
        in_filter: false,
      });
    }
  }, [edited]);
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className={`row my-3 add-edit-attr ${edited ? "bg-active" : ""}`}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormController
              control="input"
              type="text"
              label="عنوان"
              error={errors.title?.message}
              className="col-md-6 col-lg-8"
              {...register("title")}
              placeholder="عنوان ویژگی جدید"
            />
            <FormController
              control="input"
              type="text"
              label="واحد"
              error={errors.unit?.message}
              className="col-md-6 col-lg-8"
              {...register("unit")}
              placeholder="واحد ویژگی جدید"
            />
            <FormController
              control="checkbox"
              label="نمایش در فیلتر"
              error={errors.in_filter?.message}
              id="in_filter"
              {...register("in_filter")}
            />
            <div className="col-4 col-lg-2 d-flex justify-content-center align-items-center my-1">
              <SubmitButton
                isDirty={isDirty}
                isValid={isValid}
                isSubmitting={isSubmitting}
                title="ذخیره"
              />
              <button
                onClick={() => setEdited(null)}
                type="button"
                className="btn btn-secondary "
              >
                انصراف
              </button>
            </div>
          </form>
        </div>
        <hr />
        <DataTable
          data={data}
          itemsInTable={itemsInTable}
          additionalColumn={additionalColumn}
          itemsInPage={12}
          searchField={["title", "category"]}
          isLoading={isLoading}
        >
          <PrevPageButton />
        </DataTable>
      </div>
    </div>
  );
};

export default Attributes;
