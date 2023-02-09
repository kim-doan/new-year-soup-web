import { SoupApi } from 'apiClients/soupApi';

export default class SoupService {
  private soupApi: SoupApi;

  constructor() {
    this.soupApi = new SoupApi();
  }

  public getSoupList = async (uid: string, page: number, size: number) => {
    try {
      const res = await this.soupApi.getSoup(uid, page, size);

      return res.data;
    } catch (e) {
      console.log(e);
    }
  };
}
