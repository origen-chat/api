import { Job } from 'bull';

export type JobProcessor<TData> = (job: Job<TData>) => Promise<any>;
