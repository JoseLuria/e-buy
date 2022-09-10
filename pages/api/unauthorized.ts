import type { NextApiRequest, NextApiResponse } from "next";
import { ApiMessage } from "@/interfaces";

export default function Handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiMessage>
) {
  res.status(401).json({ message: "Usuario no autorizado" });
}
