const send_authenticated_test_request = async (
  route,
  userCookie,
  method,
  body
) => {
  return await fetch('http://localhost:8080' + route, {
    method: method,
    headers: {
      Authorization: userCookie,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};

export { send_authenticated_test_request };
