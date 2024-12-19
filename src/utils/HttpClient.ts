import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export class HttpClient {
    private readonly instance: AxiosInstance;

    constructor(
        private readonly baseURL: string,
        private readonly accessToken: string
    ) {
        this.instance = axios.create({
            baseURL,
            timeout: 10000,
            headers: {
                "Content-Type": "application/json",
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors(): void {
        this.instance.interceptors.request.use(
            (config) => {
                config.params = {
                    ...config.params,
                    access_token: this.accessToken,
                };
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        this.instance.interceptors.response.use(
            (response) => response,
            (error) => {
                console.error(
                    "HTTP Error:",
                    error.response?.data || error.message
                );
                return Promise.reject(error);
            }
        );
    }

    /**
     * Выполняет GET-запрос к VK API.
     * @param method - Название метода VK API (например, "users.get").
     * @param params - Объект параметров для запроса.
     */
    public async callGet<T>(
        method: string,
        params: Record<string, string | object> = {}
    ): Promise<AxiosResponse<T>> {
        return await this.instance.get<T>(method, { params });
    }

    /**
     * Выполняет POST-запрос к VK API.
     * @param method - Название метода VK API (например, "messages.send").
     * @param params - Объект параметров для запроса.
     */
    public async callPost<T>(
        method: string,
        params: Record<string, string | object> = {}
    ): Promise<AxiosResponse<T>> {
        return await this.instance.post<T>(method, params, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });
    }

    /**
     * Выполняет POST-запрос на произвольный URL.
     * @param url - URL, на который нужно отправить запрос.
     * @param data - Тело запроса.
     * @param config - Дополнительная конфигурация.
     */
    public async postToUrl<T>(
        url: string,
        data: string | object,
        config: AxiosRequestConfig = {}
    ): Promise<AxiosResponse<T>> {
        return await axios.post<T>(url, data, config);
    }
}
