import { createPortal } from "react-dom";
import PrevPageButton from "./PrevPageButton";
import { useNavigate } from "react-router";

const Modal = ({ id, fullScreen, title, children, isOpen = false }) => {
  const navigate = useNavigate();
  return createPortal(
    <>
      <div
        className={`modal fade ${isOpen ? "show d-block" : ""}`}
        id={id}
        aria-hidden={!isOpen}
      >
        <div className={`modal-dialog ${fullScreen ? "modal-fullscreen" : ""}`}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title flex-fill" id="exampleModalLabel">
                {title}
              </h5>
              {isOpen ? (
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => navigate(-1)}
                ></button>
              ) : (
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              )}
            </div>
            <div className="modal-body">
              {/* body  */}
              {children}
            </div>
            <div className="modal-footer">
              {isOpen ? (
                <PrevPageButton />
              ) : (
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  انصراف
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {isOpen && <div className="modal-backdrop fade show"></div>}
    </>,
    document.getElementById("portal-root")
  );
};

export default Modal;
