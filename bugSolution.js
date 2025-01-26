The solution involves using promises or async/await to ensure the camera is initialized before attempting to access features. Here's an example using async/await:

```javascript
import * as React from 'react';
import { Camera, CameraType } from 'expo-camera';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [cameraRef, setCameraRef] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const photo = await cameraRef.takePictureAsync();
        // Handle the photo
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  if (hasPermission === null) {
    return <View />; // or a loading indicator
  } else if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Camera style={{ flex: 1 }} type={CameraType.back} ref={ref => setCameraRef(ref)}>
      <Button title="Take Picture" onPress={takePicture} />
    </Camera>
  );
};

export default CameraScreen;
```

This revised code waits for the `cameraRef` to be available before attempting any camera operations, preventing the premature access issue.