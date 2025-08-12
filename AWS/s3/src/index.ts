import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
dotenv.config();

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

async function getObjectURL(objectKey: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: "new.nilaycodes",
    Key: objectKey,
  });
  const signedUrl = await getSignedUrl(s3Client, command);
  return signedUrl;
}
async function putObjectURL(filename: string, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: "new.nilaycodes",
    Key: `uploads/user_name/${filename}`,
    ContentType: contentType,
  });
  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });
  return signedUrl;
}
const main = async () => {
  //   const key = "Nilay_Passport.png";
  //   console.log(`PreSigned GET URL for ${key} is ${await getObjectURL(key)} `);

  //   const fileName = `pdf-${Date.now()}.pdf`;
  //   const contentType = "application/pdf";
  //   console.log(
  //       `PreSigned PUT URL for ${fileName} of type ${contentType} is ${await putObjectURL(
  //           fileName,
  //       contentType
  //     )}`);

  const fileName = `pdf-1748328390008.pdf`;
  const key = `uploads/user_name/${fileName}`;
  console.log(`PreSigned GET URL for ${key} is ${await getObjectURL(key)} `);
};
main();
