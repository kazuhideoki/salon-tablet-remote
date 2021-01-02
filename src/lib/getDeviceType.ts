import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import parser from 'ua-parser-js';
import { TUaDeviceType } from '../app/Store/Interface';

export const getDeviceType = (
  context: GetServerSidePropsContext<ParsedUrlQuery>
): TUaDeviceType => {
  const req = context.req;
  const ua = new parser.UAParser(req.headers['user-agent']);
  return (ua.getDevice().type as TUaDeviceType) || 'unknown';
};
