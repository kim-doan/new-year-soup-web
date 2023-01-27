import { SoupApi } from 'apiClients/soupApi';

export default class SoupService {
  private soupApi: SoupApi;

  constructor() {
    this.soupApi = new SoupApi();
  }

  public async getSoupList() {
    try {
      const res = await this.soupApi.meSoup();

      return res.data;
    } catch (e) {
      alert('내 떡국 리스트를 불러오는데 실패했습니다');
    }
  }
}
