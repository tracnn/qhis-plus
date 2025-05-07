export const EnvConfig = {
  base_url: process.env.tracnn_BASE_URL || 'localhost',
  port: parseInt(process.env.tracnn_PORT || '3000', 10),
};
