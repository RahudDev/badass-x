import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { Device } from '@capacitor/device';

const DeviceInfo = () => {
    const [deviceInfo, setDeviceInfo] = useState({});
    const [platform, setPlatform] = useState('');

    useEffect(() => {
        const getDeviceInfo = async () => {
            // Get platform (android, ios, web)
            const platform = Capacitor.getPlatform();
            setPlatform(platform);

            // Get detailed device info
            const info = await Device.getInfo();
            setDeviceInfo(info);
        };

        getDeviceInfo();
    }, []);

    return (
        <div>
            <h1>Device Information</h1>
            <p><strong>Platform:</strong> {platform}</p>
            <p><strong>Device Info:</strong> {JSON.stringify(deviceInfo, null, 2)}</p>
        </div>
    );
};

export default DeviceInfo;
