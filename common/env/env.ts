import { InternalServerErrorException } from '@nestjs/common';
import { z } from 'zod';

const envSchema = z.object({
  DATA_BASE_URL: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  throw new InternalServerErrorException('Invalid environment variables');
}

export const env = _env.data;
