export const successResponse = (data: any, message = 'Success', statusCode = 200) => {
  return new Response(JSON.stringify({ success: true, message, data }), {
    status: statusCode,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const errorResponse = (message: string, statusCode = 400) => {
  return new Response(JSON.stringify({ success: false, message }), {
    status: statusCode,
    headers: { 'Content-Type': 'application/json' },
  });
};
