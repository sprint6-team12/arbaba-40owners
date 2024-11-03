import fetchInstance from './fetchInstance';

interface GetAlertData {
  user_id: string;
  offset?: number;
  limit?: number;
  alert_id?: string;
}

export async function getAlerts({ user_id, offset, limit }: GetAlertData) {
  const params = {
    offset,
    limit,
  };
  const response = await fetchInstance.get(`/users/${user_id}/alerts`, {
    params,
  });
  return response;
}

export async function putAlerts({ user_id, alert_id }: GetAlertData) {
  const requestBody = {};
  const response = await fetchInstance.put(
    `/users/${user_id}/alerts/${alert_id}`,
    requestBody
  );
  return response;
}
