import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

type requestSession = NextRequest | NextApiRequest;

type AsyncFunction = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<any>;

export class AppError extends Error {
  public code: number;
  public message: string;

  constructor(code: number, message: string) {
    super();
    this.code = code;
    this.message = message;
  }
}

export const invalidMethod = () => {
  throw new AppError(400, "Invalid Method");
};

export const catchError = (fn: AsyncFunction) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    return fn(req, res).catch((error) =>
      res.status(error.code ? error.code : 500).json({ message: error.message })
    );
  };
};

export const apiRedirect = (req: NextRequest, page: string) => {
  const url = req.nextUrl.clone();
  url.pathname = page;
  return NextResponse.redirect(url);
};

export const apiRedirectToLogin = (req: NextRequest) => {
  const requestedPage = req.nextUrl.pathname;
  const url = req.nextUrl.clone();
  url.pathname = "/auth/login";
  url.search = `page=${requestedPage}`;
  return NextResponse.redirect(url);
};

export const getSession = async (req: requestSession): Promise<any> => {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  return session;
};

export const apiUnauthorized = (req: NextRequest) => {
  const url = req.nextUrl.clone();
  url.pathname = "/api/unauthorized";
  return NextResponse.rewrite(url);
};
