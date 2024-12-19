# Pxolly Express Callback

This project is an Express-based server that handles various events from the VK API.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

    ```sh
    git clone github.com/hexvel/pxolly-express-callback
    cd pxolly-express-callback
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

## Configuration

Create a file `.env`

 file in the root of the project and add the necessary environment variables:

```
PORT=3000
VK_ACCESS_TOKEN=<your VK access token>
PXOLLY_ACCESS_TOKEN=<your Pxolly access token>
```

## Usage

### Development Mode

To run the server in development mode, install deno:
https://docs.deno.com/runtime/getting_started/installation/


## API Endpoints

### POST /callback

Handles incoming events from Pxolly-Webhook.

#### Example Request

```json
{
  "type": "confirmation",
  "object": {
    "date": 1234567890
  },
  "from_id": 12345678,
  "event_id": "..."
}
```

## Project Structure

- [`src/handlers`](src/handlers ) - Event handlers
  - [`BaseHandler`](src/handlers/BaseHandler.ts )
  - [`ChatPhotoUpdateHandler`](src/handlers/ChatPhotoUpdate.ts )
  - [`ConfirmationHandler`](src/handlers/ConfirmationHandler.ts )
  - [`DeleteForAllHandler`](src/handlers/deleteForAll.ts )
  - [`InviteUserHandler`](src/handlers/InviteUser.ts )
  - [`ResetThemeHandler`](src/handlers/resetTheme.ts )
  - [`SetThemeHandler`](src/handlers/setTheme.ts )
  - [`SyncHandler`](src/handlers/SyncHandler.ts )
- [`src/types`](src/types ) - Data types
  - [`event`](src/types/event.ts )
  - [`message`](src/types/message.ts )
  - [`object`](src/types/object.ts )
  - [`user`](src/types/user.ts )
- [`src/utils`](src/utils ) - Utilities
  - [`HttpClient`](src/utils/HttpClient.ts )
  - [`VkApi`](src/utils/VkApi.ts )
- [`src/index.ts`](src/index.ts ) - Entry point

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [`LICENSE`](LICENSE) file for details.
