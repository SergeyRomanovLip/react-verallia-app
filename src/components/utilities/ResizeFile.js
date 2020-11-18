import Resizer from 'react-image-file-resizer'

export const resizeFile = (file, maxWidth, maxHeight) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      'JPEG',
      50,
      0,
      (uri) => {
        resolve(uri)
      },
      'base64'
    )
  })
