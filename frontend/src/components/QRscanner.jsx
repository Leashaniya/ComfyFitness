import React from 'react';
import QRCode from 'qrcode.react';

const QRscanner = ({ value }) => {
  return (
    <div>
      <QRCode value={value} />
    </div>
  );
};

export default QRscanner;
