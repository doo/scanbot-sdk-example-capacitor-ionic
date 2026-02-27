import {
  autorelease,
  EncodeImageOptions,
  ImageRef,
  SaveImageOptions,
} from 'capacitor-plugin-scanbot-sdk';
import { Directory, Filesystem } from '@capacitor/filesystem';

export async function imageRefUsage(imageFileUri: string) {
  await autorelease(async () => {
    const ref = await ImageRef.fromImageFileUri(imageFileUri);
    if (ref !== null) {
      /*
       * The `info()` method retrieves information about the image reference.
       * - Returns details such as dimensions, format, and file size.
       * - Useful for validating the image or for further processing steps.
       */
      const imageInfo = await ref.info();
      console.log('Image size', imageInfo?.maxByteSize);

      const path = await Filesystem.getUri({ path: '/saved_image.jpg', directory: Directory.Data });
      /*
       * The `saveImage()` method allows you to save the image reference to a specified file path.
       *  - Useful for storing the processed image or for sharing it with other applications.
       */
      const saveImageRefAtPath = await ref.saveImage(
        path.uri,
        new SaveImageOptions({
          quality: 80,
        }),
      );
      console.log('Is image saved successfully?', saveImageRefAtPath);

      /*
       * The `encodeImage()` method encodes the image reference into a base64 format.
       *  - Useful for transmitting the image data over a network.
       */
      const encodedBuffer = await ref.encodeImage(new EncodeImageOptions());
      console.log('Encoded buffer', encodedBuffer);

      /*
       * The `serialize()` method allows you to serialize the image reference.
       * - Useful for storing the image reference in a format that can be easily transmitted or saved.
       * - The serialized reference can be deserialized later to retrieve the original image reference.
       */
      const serializedRef = await ref.serialize('BUFFER');
    }
  });
}
