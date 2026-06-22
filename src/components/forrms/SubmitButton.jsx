const SubmitButton = ({ title, isDirty, isValid, isSubmitting }) => {
  return (
    <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
      <button
        type="submit"
        disabled={!isDirty || !isValid || isSubmitting}
        className="btn btn-primary "
      >
        {title}
      </button>
    </div>
  );
};

export default SubmitButton;
