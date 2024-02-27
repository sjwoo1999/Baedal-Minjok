export class UsersControllers {
    constructor(usersService) {
        this.usersService = usersService;
    }

    // 회원가입(이메일 인증기능)
    signUp = async (req, res, next) => {
        try {
            const { email, userName, password, passwordCheck, address, type } = req.body;

            if (!email || !userName || !password || !passwordCheck || !address || !type) {
                return res.status(404).json({
                    errMessage: '정보가 입력 되지 않았습니다. 정보를 입력해주세요.',
                });
            }

            if (password !== passwordCheck || password.length < 6) {
                return res.status(400).json({
                    errMessage: '비밀번호의 길이가 짧거나 두 비밀번호가 일치하지 않습니다.',
                });
            }

            if (!(type === 'GUEST' || type === 'OWNER')) {
                return res.status(400).json({
                    errMessage: '회원의 타입이 지정된것과 다릅니다. 다시입력해주세요',
                });
            }

            const User = await this.usersService.createUser(email, userName, password, address, type);

            return res.status(201).json({ successMessage: `${User.userName}님 가입이 완료되었습니다.` });
        } catch (err) {
            next(err);
        }
    };

    // 로그인
    signIn = async (req, res, next) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ errMessage: '비밀번호와 이메일을 작성해주세요' });
            }

            const user = await this.usersService.signInUser(email, password);
            res.cookie('accessToken', user.accessToken);
            res.cookie('refreshToken', user.refreshToken);

            if (user.type === 'OWNER') {
                return res.status(201).json({
                    successMessage: `${user.userName} 사장님 로그인 성공!`,
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken,
                });
            } else if (user.type === 'GUEST') {
                return res.status(201).json({
                    successMessage: `${user.userName}님 로그인 성공!`,
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken,
                });
            }
        } catch (err) {
            next(err);
        }
    };

    // 로그아웃
    signOut = async (req, res, next) => {
        try {
            const { id } = req.user;

            await this.usersService.signOutUser(id);

            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            console.log('여기까지옴');
            return res.status(200).json({ successMessage: '로그아웃이 성공적으로 완료되었습니다.' });
        } catch (err) {
            next(err);
        }
    };

    // 내정보 조회
    myInfo = async (req, res, next) => {
        try {
            const { id } = req.user;

            const user = await this.usersService.getUserById(id);

            return res.status(200).json({
                successMessage: '내 정보 조회가 완료되었습니다.',
                data: user,
            });
        } catch (err) {
            next(err);
        }
    };
}
