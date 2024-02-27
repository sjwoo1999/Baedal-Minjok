export default function (err, req, res, next) {
    // 에러처리하기

    switch (err.name) {
        case 'ReferenceError':
            console.log(err.message);
            return res.status(404).json({ errMessage: err.message }); // 정의되지 않은 변수를 참조하려할 때 발생

        case 'SyntaxError':
            console.log(err.message);
            return res.status(400).json({ errMessage: err.message }); // 코드의 구문이 잘못됨

        case 'TypeError':
            console.log(err.message);
            return res.status(400).json({ errMessage: err.message }); // 데이터 타입이 예상과 다름

        case 'RangeError':
            console.log(err.message);
            return res.status(400).json({ errMessage: err.message }); // 숫자값이 허용된 범위 벗어남

        case 'EmailAlreadyExistsError':
            console.log(err.message);
            return res.status(407).json({ errMessage: err.message }); // 이메일 중복일시 에러

        case 'NotFoundError':
            return res.status(404).json({ errMessage: err.message }); // 존재하지 않는 것에 대한 에러

        case 'InconsistencyError':
            return res.status(400).json({ errMessage: err.message }); // 존재하지 않는 것에 대한 에러

        case 'TokenError':
            return res.status(401).json({ errMessage: err.message }); // 존재하지 않는 것에 대한 에러

        default:
            console.log(err.message);
            return res.status(500).json({ errorMessage: '서버 내부 에러가 발생했습니다.' });
    }
}
