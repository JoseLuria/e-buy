import type { NextApiRequest, NextApiResponse } from "next";
import { ApiMessage } from "@/interfaces";
import { invalidMethod, AppError, catchError } from "@/utils";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config(process.env.CLOUDINARY_URL!);

type Data = ApiMessage;

export default catchError(
  async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    switch (req.method) {
      case "DELETE":
        return await deleteFile(req, res);
      default:
        return invalidMethod();
    }
  }
);

const deleteFile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { image } = req.query as { image: string };

  if (!image) {
    throw new AppError(400, "Sucedio un error");
  }

  await cloudinary.uploader.destroy(image);

  res.status(200).json({ message: "Eliminado" });
};
