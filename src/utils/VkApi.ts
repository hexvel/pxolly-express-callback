import { HttpClient } from "./HttpClient.ts";

export class VkApi {
    public httpClient: HttpClient;
    private apiVersion: string;

    constructor(accessToken: string, apiVersion: string = "5.228") {
        this.httpClient = new HttpClient(
            "https://api.vk.com/method",
            accessToken
        );
        this.apiVersion = apiVersion;
    }

    private getApiUrl(method: string): string {
        return `/${method}`;
    }

    public async callMethod(
        method: string,
        params: Record<string, any> = {}
    ): Promise<any> {
        const url = this.getApiUrl(method);
        const response = await this.httpClient.callPost(url, {
            ...params,
            v: this.apiVersion, // Версия API добавляется в параметры
        });
        return response.data;
    }

    public async searchPeer(
        text: string,
        from_id: number,
        date: number,
        conversation_message_id: number
    ): Promise<number | false> {
        const code = `
            var e = 2000000000;
            var h = API.messages.search({
                q: Args.text,
                count: 5
            }).items;

            var i = 0;
            while (i < h.length) {
                if (
                    h[i].peer_id > e &&
                    Args.text == h[i].text &&
                    Args.from_id == h[i].from_id &&
                    Args.date == h[i].date &&
                    Args.conversation_message_id == h[i].conversation_message_id
                ) {
                    return h[i].peer_id - e;
                }
                i = i + 1;
            }
            return false;
        `;

        const response = await this.callMethod("execute", {
            code,
            text,
            from_id,
            date,
            conversation_message_id,
        });

        return response.response;
    }

    async sendMessage(chat_id: number, message: string) {
        await this.callMethod("messages.send", {
            chat_id,
            message,
            random_id: 0,
        });
    }
}
