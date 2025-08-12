"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log(process.env);
const s3Client = new client_s3_1.S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
});
function getObjectURL(objectKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = new client_s3_1.GetObjectCommand({
            Bucket: "new.nilaycodes",
            Key: objectKey,
        });
        const signedUrl = yield (0, s3_request_presigner_1.getSignedUrl)(s3Client, command);
        return signedUrl;
    });
}
function putObjectURL(filename, contentType) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = new client_s3_1.PutObjectCommand({
            Bucket: "new.nilaycodes",
            Key: `uploads/user_name/${filename}`,
            ContentType: contentType,
        });
        const signedUrl = yield (0, s3_request_presigner_1.getSignedUrl)(s3Client, command, { expiresIn: 300 });
        return signedUrl;
    });
}
const main = () => __awaiter(void 0, void 0, void 0, function* () {
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
    console.log(`PreSigned GET URL for ${key} is ${yield getObjectURL(key)} `);
});
main();
