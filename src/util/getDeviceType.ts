import { IncomingMessage } from 'http';
import parser from 'ua-parser-js';
import { TUaDeviceType } from './interface/Interface';

export const getDeviceType = (req: IncomingMessage): TUaDeviceType => {
  const ua = new parser.UAParser(req.headers['user-agent']);
  return (ua.getDevice().type as TUaDeviceType) || 'unknown';
};
