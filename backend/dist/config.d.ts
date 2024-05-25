declare const _default: {
    env: {
        NODE_ENV: string | undefined;
        PORT: number;
        HOST: string | undefined;
        DB_NAME: string | undefined;
        DB_USER: string | undefined;
        DB_PASS: string | undefined;
        AUTH_DURATION_DAYS: number;
        SECRET: string | undefined;
    };
    cors: {
        origin: string[];
        methods: string[];
        credentials: boolean;
    };
    cookie: {
        httpOnly: boolean;
        secure: boolean;
        maxAge: number;
        sameSite: string;
    };
    msg: {
        auth: {
            ok: string;
            incorrect: string;
            emailExists: string;
            cpfExists: string;
        };
        user: {
            notFound: string;
            created: string;
            deleted: string;
            updated: string;
        };
        server: {
            great: string;
            err: string;
            denied: string;
            invalidToken: string;
        };
    };
};
export default _default;
