const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxcx1YgI5auaui4EOKOSLQjdXKVIZgmV3GRGdCjf8rp46wL5q9aY-sLH1CEHtA_yQzp/exec';

exports.handler = async function(event) {
  const sheet = event.queryStringParameters && event.queryStringParameters.sheet;

  if (!sheet) {
    return {
      statusCode: 400,
      headers: corsHeaders(),
      body: JSON.stringify({ error: '缺少 sheet 參數' }),
    };
  }

  try {
    const url = APPS_SCRIPT_URL + '?sheet=' + encodeURIComponent(sheet);
    const res = await fetch(url, { redirect: 'follow' });
    const data = await res.json();

    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: JSON.stringify(data),
    };
  } catch (e) {
    console.error('availability function error:', e);
    return {
      statusCode: 502,
      headers: corsHeaders(),
      body: JSON.stringify({ error: '無法取得資料', detail: e.message }),
    };
  }
};

function corsHeaders() {
  return {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}
