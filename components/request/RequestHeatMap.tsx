export interface ErrorData {
  [key: string]: any;
}

export interface ResultData {
  [key: string]: any;
}

export default async function RequestHeatMap({
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
  formData.append("file", file); // 'file' 是服务器端期待的字段名

  let response = null;
  response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/calculate/heatmap/?start_period=${start_period}&interval=${interval}&num_periods=${num_periods}`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
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
