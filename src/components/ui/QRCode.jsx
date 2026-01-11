import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

export const RealQRCode = ({ value, size = 120 }) => {
    return (
        <div className="bg-white p-3 rounded-xl shadow-lg inline-block">
            <QRCodeSVG
                value={value}
                size={size}
                fgColor="#000000"
                imageSettings={{
                    src: "https://flagcdn.com/ma.svg",
                    x: undefined,
                    y: undefined,
                    height: 24,
                    width: 24,
                    excavate: true,
                }}
            />
        </div>
    )
};
