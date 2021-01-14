import * as React from 'react';
import * as LocalAuthentication from 'expo-local-authentication';

export default function useFingerprints() {
  const [compatible, setCompatible] = React.useState(false);
  const [fingerprints, setFingerprints] = React.useState(false);

  const checkDeviceForHardware = async () => {
    let compatible = await LocalAuthentication.hasHardwareAsync();
    setCompatible(compatible)
  }
  
  const checkForFingerprints = async () => {
    let fingerprints = await LocalAuthentication.isEnrolledAsync();
    setFingerprints(fingerprints)
  }
  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    checkDeviceForHardware();
    checkForFingerprints();
  }, []);

  const result = async () => {
    if(compatible && fingerprints) {
      return await LocalAuthentication.authenticateAsync({promptMessage: 'Can you scan your finger please'}).then(r => console.log(r.success ? 'Success' : r.error));
    }
  };

  return { scanFingerPrint: result }
}
