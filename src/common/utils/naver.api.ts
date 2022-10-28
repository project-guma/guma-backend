import axios from 'axios';

// 하루에 한 번
// 오늘 날짜에 맞는 데이터가 Alarm entity 에 있는지 확인
// 없으면 끝
// 있으면 해당 컬럼의 SubscribeListId -> ItemId -> name 을 찾아서
// naver api 로 데이터 긁어오고
// 긁어온 데이터 Items 테이블에 업데이트 시킴.

// naver api

export async function naverApi(query: string) {
    let config = {
        method: 'get',
        url: `https://openapi.naver.com/v1/search/shop.json?query=${query}&sort=asc`,
        headers: {
            'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
            'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
        },
    };

    axios(config)
        .then(function (response) {
            const result = JSON.stringify(response.data);
            console.log(result);
            return result;
        })
        .catch(function (error) {
            console.log(error);
            throw error;
        });
}
