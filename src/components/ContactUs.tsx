import React from "react";
import {
  AiOutlineGithub,
  AiOutlineHome,
  AiOutlineMessage,
  AiOutlinePhone,
} from "react-icons/ai";

import ReactQrCode from "react-qr-code";

function ContactUs() {
  return (
    <div className="row">
      <div className="col-4">
        Contact us:
        <br />
        <p>
          <AiOutlineMessage /> <br />
          <a href="mailto:ptap028@gmail.com">ptap028@gmail.com</a>
        </p>
        <p>
          <AiOutlinePhone /> <br />
          123456789
        </p>
        <p>
          <AiOutlineHome /> <br /> Kraków
        </p>
      </div>
      <div className="col-4">
        Our social media:
        <p>
          <AiOutlineGithub /> <br />
          <a href="https://github.com/ptakpiotr">Creator's github</a>
        </p>
      </div>
      <div className="col-4">
        Share this site:
        <ReactQrCode value="http://localhost:3000" className="qrcode" />
      </div>
    </div>
  );
}

export default ContactUs;
