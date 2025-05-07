import HtmlContent from "@/utils/htmlContent";
import { Modal, ModalBody, ModalFooter } from "react-bootstrap";

export default function CookieConsentModal({
  cookies_warning_text,
  open,
  handleAccept,
  handleReject,
}) {
  return (
    <Modal
      show={open}
      centered
      className="modal fade zoomIn"
      backdrop="static"
      keyboard={false}
    >
      <ModalBody className="modal-body px-4">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-12 text-center reg-div px-4">
            <h5 className="head mt-0 mb-3">Cookie Consent</h5>
            <div className="row d-flex justify-content-center">
              <div className="col-lg-12 text-start mb-3">
                <HtmlContent data={cookies_warning_text} />
              </div>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <div className="row">
          <div className="col-6">
            <button className="btn btn-secondary w-100" onClick={handleReject}>
              Reject
            </button>
          </div>
          <div className="col-6">
            <button className="btn btn-primary w-100" onClick={handleAccept}>
              Accept
            </button>
          </div>
        </div>
      </ModalFooter>
    </Modal>
  );
}
