import { createClient } from '@rivermountain/fetch-to-axios';
import fetchInstance from './fetchInstance';

const uploadImageToS3 = async (url: string, fileObject: File) => {
  await createClient({
    headers: {
      'Content-Type': fileObject.type,
    },
  }).put(url, fileObject);
};

export async function imageAPI(fileObject: File) {
  const response = await fetchInstance.post(
    `/images`,
    { name: fileObject.name },
    {}
  );
  const result = response;
  await uploadImageToS3(result.item.url, fileObject);

  const instanceUrl = new URL(result.item.url);
  const urlWithoutQueryString = instanceUrl.origin + instanceUrl.pathname;
  return urlWithoutQueryString;
}
