import { UploadApiResponse, v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: 'dd1y089s0',
  api_key: '634192681127148',
  api_secret: 'uGMf6lqggQ2SCJ9nWUB3KyyXStw'
})

interface CloudinaryResult {
  url: string
  public_id: string
  // Add other properties as needed
}

const cloudinaryUploadImg = async (fileToUploads: string): Promise<CloudinaryResult> => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(fileToUploads, (err: any, result: CloudinaryResult) => {
      resolve({
        url: result?.url,
        public_id: result?.public_id
        // Add other properties from the result as needed
      })
    })
  })
}
export default cloudinaryUploadImg
