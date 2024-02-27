import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// 전송객체 생성, 옵션객체를 전달하여 전송객체를 설정
// export const smtpTransport = nodemailer.createTransport({
// pool: true, // SMTP풀 사용여부, 여러 이메일을 보낼때 연결을 재 사용할수 있도록 해줌
// maxConnections: 1, // pool에서 허용되는 최대 동시 연결수를 설정
// service: process.env.MAILSERVICE, // 이메일서비스 - 어디쪽의 이메일을 사용할것인지(naver, gmail ...)
// host: process.env.HOSTMAIL, // SMTP호스트 주소
// port: process.env.MAILPORT, // SMTP포트 번호
// secure: false, // 보안 연결(SSL,TLS)사용 여부 나타냄, 여기선 비보안 연결 사용
// requireTLS: true, // TLS(전송 계층 보안)의 필요여부,
// auth: {
//     // 이메일 서버에 대한 인증정보가 포함된 객체
//     user: process.env.AUTHUSER, // 이메일을 보내는 본인 이메일 (발신자)
//     pass: process.env.AUTHPASS, // 해당 이메일의 비밀번호(발신자)
// },
// tls: {
//     // TLS의 설정을 나타내는 객체
//     rejectUnauthorized: false, // TLS 인증서의 유효성을 검사할지 여부
// },
// });

export const smtpTransport = nodemailer.createTransport({
    service: process.env.MAILSERVICE,
    host: process.env.HOSTMAIL,
    port: process.env.MAILPORT,
    secure: false,
    auth: {
        // 이메일 서버에 대한 인증정보가 포함된 객체
        user: process.env.AUTHUSER, // 이메일을 보내는 본인 이메일 (발신자)
        pass: process.env.AUTHPASS, // 해당 이메일의 비밀번호(발신자)
    },
});
