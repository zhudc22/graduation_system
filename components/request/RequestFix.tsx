// curl -X 'POST' \
//   'http://127.0.0.1:8000/calculate/fixed/?start_period=10&interval=1' \
//   -H 'accept: application/json' \
//   -H 'Content-Type: multipart/form-data' \
//   -F 'file=@数据库1.xlsx;type=application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

export default function RequestFix({
  start_period,
  interval,
  file,
}: {
  start_period: number;
  interval: number;
  file: string;
}) {
  resp = fetch(
    `http://127.0.0.1:8000/calculate/fixed/?start_period=${start_period}&interval=${interval}`,
    {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: file,
    }
  ).then((response) => response.json());
  return resp;
}
