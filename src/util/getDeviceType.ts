import { IncomingMessage } from 'http';
import parser from 'ua-parser-js';
import { UaDeviceType } from './interface/Interface';

export const getDeviceType = (req: IncomingMessage): UaDeviceType => {
  const ua = new parser.UAParser(req.headers['user-agent']);
  return (ua.getDevice().type as UaDeviceType) || 'unknown';
};
