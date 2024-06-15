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
}) {
  // 创建 FormData 对象
  const formData = new FormData();
  formData.append("file", file); // 'file' 是服务器端期待的字段名

  // 发起 fetch 请求
  const response = await fetch(
    `http://127.0.0.1:8000/calculate/fixed/?start_period=${start_period}&interval=${interval}&num_periods=${num_periods}`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
      },
      body: formData,
    }
  );

  // 解析响应体为JSON
  const resp = await response.json();
  return resp;
}
