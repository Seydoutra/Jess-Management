import type { NextConfig } from 'next';
const config: NextConfig = {
  poweredByHeader:false,
  output:'export',
  basePath:'/Jess-Management',
  assetPrefix:'/Jess-Management/',
  images:{unoptimized:true}
};
export default config;
