import { GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import parser from "ua-parser-js";

export const getDeviceType = (context: GetServerSidePropsContext<ParsedUrlQuery>
) => {
    const req = context.req;
    const ua = new parser.UAParser(req.headers["user-agent"]);
    return ua.getDevice().type;
}