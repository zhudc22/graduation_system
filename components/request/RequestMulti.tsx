import { useState } from 'react';

export interface ErrorData {
  [key: string]: any;
}

export interface ResultData {
  [key: string]: any;
}

export default async function RequestMulti({
  start_period,
  num_periods,
  interval,
  file,
}: {
  start_period: any;
  num_periods: any;
  interval: any;
  file: File;
}): Promise<{ data?: ResultData; error?: ErrorData }> {
  const formData = new FormData();
  formData.append('file', file); // 'file' 是服务器端期待的字段名

  let response = null
     response = await fetch(
      `http://192.168.0.4:8000/calculate/multi/?start_period=${start_period}&interval=${interval}&num_periods=${num_periods}`,
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const errorResp: ErrorData = await response.json();
      return { error: errorResp };
    }

    const result: ResultData = await response.json();
    return { data: result };
}
