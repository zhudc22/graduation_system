export interface ErrorData {
  [key: string]: any;
}

export interface ResultData {
  [key: string]: any;
}

export default async function RequestMultipliers({
  start_period,
  interval,
  num_multipliers,
  file,
}: {
  start_period: any;
  interval: any;
  num_multipliers: any;
  file: File;
}): Promise<{ data?: ResultData; error?: ErrorData }> {
  const formData = new FormData();
  formData.append('file', file); // 'file' 是服务器端期待的字段名

  let response = null;
  response = await fetch(
    `http://127.0.0.1:8000/calculate/multipliers/?start_period=${start_period}&interval=${interval}&num_multipliers=${num_multipliers}`,
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
