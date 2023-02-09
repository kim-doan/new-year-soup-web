import { SoupApi } from 'apiClients/soupApi';
import axios from 'axios';
import { fbAuth } from 'common/lib/firebase/firebase';

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

  public getSoupDetail = async (soupNo: number) => {
    try {
      const idToken = await fbAuth.currentUser?.getIdToken();
      axios.defaults.headers.common['Authorization'] = `Bearer ${idToken}`;

      if (idToken) {
        const res = await this.soupApi.getSoupDetail(soupNo);

        return res.data;
      }
    } catch (e) {
      alert('떡국의 메시지를 불러오는데 실패했습니다.');
    }
  };

  public deliverySoup = async (
    reqUserId: string,
    soupContents: string,
    soupImgId: string
  ) => {
    try {
      const idToken = await fbAuth.currentUser?.getIdToken();
      if (idToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${idToken}`;
        await this.soupApi.deliverySoup({
          reqUserId,
          soupContents,
          soupImgId,
        });

        return true;
      } else {
        alert('로그인 후 이용이 가능합니다');
      }
    } catch (e) {
      alert('떡국을 전달하는데 실패했습니다');
      return false;
    }
  };
}
