// Storage helper (S3) - optional production integration
// Install with: npm install @aws-sdk/client-s3
// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

// const client = new S3Client({ region: process.env.AWS_REGION })

export async function uploadToS3(buffer: Buffer, filename: string){
  // if(!process.env.AWS_S3_BUCKET) throw new Error('Missing AWS_S3_BUCKET')
  // const cmd = new PutObjectCommand({
  //   Bucket: process.env.AWS_S3_BUCKET,
  //   Key: filename,
  //   Body: buffer,
  //   ACL: 'private'
  // })
  // await client.send(cmd)
  // return `s3://${process.env.AWS_S3_BUCKET}/${filename}`
  console.warn("S3 upload disabled");
  return "";
}
