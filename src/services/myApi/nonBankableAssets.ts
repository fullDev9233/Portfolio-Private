import axios from '../../utils/setupInterceptor';

export const createNonBankableAsset = async (assetData: object): Promise<any> => {
  const { data } = await axios.post(`/non-bankable-assets`, assetData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const getCoryxFormFields = async (assetType: string) => {
  const { data } = await axios.get(`/non-bankable-assets/form-fields/${assetType}`);
  return data;
};
