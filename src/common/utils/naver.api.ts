import axios from 'axios';

let config = {
    method: 'get',
    url: 'https://openapi.naver.com/v1/search/shop.json?query=두루마리휴지3겹&sort=asc',
    headers: {
        'X-Naver-Client-Id': 'AqZZq30_WVGpShV_7Oii',
        'X-Naver-Client-Secret': 'OQ6wDs66HQ',
    },
};

axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
