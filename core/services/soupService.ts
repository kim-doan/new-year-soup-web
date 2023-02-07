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

  public deliverySoup = async (
    resUserId: string,
    soupContents: string,
    soupImgId: string
  ) => {
    try {
      const res = await this.soupApi.deliverySoup({
        resUserId,
        soupContents,
        soupImgId,
      });

      return res.data;
    } catch (e) {
      alert('떡국을 전달하는데 실패했습니다');
    }
  };
}
