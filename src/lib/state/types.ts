export interface Domain {
  id: number;
  name: string;
  enable: boolean;
  owner: string;
  created_at: string;
  updated_at: string;
}

export interface Action {
  id: number;
  job: number;
  job_id: number;
  enable: boolean;
  priority: number;
  pre_silence: number;
  post_silence: number;
  type: 'playback' | 'transfer';
  file: string | null;
  transfer_tg_id: number[];
  created_at: string;
  updated_at: string;
}

export interface CallerID {
  id: number;
  job: number;
  job_id: number;
  caller_id: string;
  created_at: string;
  updated_at: string;
}

export interface PhoneList {
  id: number;
  job: number;
  job_id: number;
  dst_number: string;
  status: 'new' | 'done' | 'failed' | 'processing';
  repeat_count: number;
  created_at: string;
  updated_at: string;
}

export interface Scheduler {
  id: number;
  job: number;
  job_id: number;
  enable: boolean;
  day_of_week: number;
  start_time: string;
  stop_time: string;
  created_at: string;
  updated_at: string;
}

export interface ActionConnection {
  id: number;
  source: number;
  target: number;
  condition: string | null;
}

export interface Job {
  id: number;
  domain: number;
  name: string;
  enable: boolean;
  utc_offset: number;
  threads: number;
  autostart: boolean;
  status: 'idle' | 'processing';
  tariff: number | null;
  tariff_name: string;
  repeat_threshold: number;
  created_at: string;
  updated_at: string;
}
