import type { NextApiRequest, NextApiResponse } from "next";
import { ApiMessage } from "@/interfaces";
import { invalidMethod, catchError } from "@/utils";
import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config(process.env.CLOUDINARY_URL!);

type Data = ApiMessage;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default catchError(
  async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    switch (req.method) {
      case "POST":
        return await uploadFile(req, res);
      default:
        return invalidMethod();
    }
  }
);

const saveFile = async (file: formidable.File): Promise<string | undefined> => {
  try {
    const data = await cloudinary.uploader.upload(file.filepath);
    return data.secure_url;
  } catch (error) {
    return undefined;
  }
};

const parseFiles = async (req: NextApiRequest): Promise<string> => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async (error, fields, files) => {
      if (error) {
        return reject(error);
      }
      const filePath = await saveFile(files.file as formidable.File);

      if (!filePath) {
        return reject(error);
      }

      resolve(filePath);
    });
  });
};

const uploadFile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const imageUrl = await parseFiles(req);
  res.status(200).json({ message: imageUrl });
};
