# PowerSynth Web Backend

This is the backend for the PowerSynth Web application. It provides a single endpoint for uploading and processing files through PowerSynth.

## Getting Started

To get started with the project, clone the repository and install the dependencies:

```sh
git clone https://github.com/PowerSynth/back-end
cd back-end
npm install
```

d~~You will also need to set up the environment variables by creating a `.env` file in the root directory of the project. You can copy the contents of `.env.example` and update the values as needed.~~

## Running the Server

To start the server, run the following command:

```sh
npm run start
```

The server will start listening on port 3000 by default. You can change this by updating the `PORT` variable in your `.env` file.

## API Documentation

### POST /api/powersynth

Uploads a zip file and processes it through PowerSynth.

#### Request

- **Content-Type**: multipart/form-data
- **Body**: The file to be uploaded. The file should be in ZIP format and should contain a macro_script.txt file.

#### Response

- **Content-Type**: application/zip
- **Body**: The processed file in ZIP format.

#### Example

```sh
curl -X POST -F "file=@path/to/your/file.zip" http://localhost:3000/api/powersynth --output output.zip
```

<!--
## Running Tests

To run the tests, run the following command:

```sh
npm run test
```

This will run the test suite for the `PowerSynthController`.-->

## Built With

- Node.js
- Express
- TypeScript

## Authors

- Connor Elliott (@connorielliott) - initial work

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
