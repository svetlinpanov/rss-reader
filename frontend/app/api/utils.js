export async function handleNonSuccessResponses(response) {
  if (!response.ok) {
    throw new Error(
      `${response.status} ${response.statusText}: ${await response.text()}`,
    );
  }

  return response;
}

export function parseJSON(response) {
  return response.json();
}
