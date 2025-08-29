const http = require("http");
const { renderFormPage, renderSubmittedPage } = require("./htmlPages");
const fs = require("fs");

let lastSubmittedParams = null;
let lastSubmittedBody = null;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");

    if (req.method === "POST" && req.url === "/submitted") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            const params = new URLSearchParams(body);
            lastSubmittedParams = params;
            lastSubmittedBody = body;
            res.end(renderSubmittedPage(params, body));
        });
        return;
    }

    // create txt file
    if (req.method === "POST" && req.url === "/message") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            // Replace + with space only for spaces, then decode
            console.log("Raw body:", body);
            const decodedBody = body.replace(/\+/g, " ");
            console.log("Decoded body:", decodedBody);
            const params = new URLSearchParams(decodedBody);
            console.log("Received message:", params);
            let message = params.get("message") || "";
            // message is now decoded correctly, including actual plus signs
            fs.appendFile("messages.txt", message + "\n", (err) => {
                if (err) {
                    res.statusCode = 500;
                    res.end("Error saving message");
                    return;
                }
                res.writeHead(302, { Location: "/" });
                res.end();
            });
        });
        return;
    }

    // Show last submitted data if available
    if (req.method === "GET" && req.url === "/submitted") {
        if (lastSubmittedParams && lastSubmittedBody) {
            res.end(renderSubmittedPage(lastSubmittedParams, lastSubmittedBody));
        } else {
            res.end("<h1>No data submitted yet.</h1><a href='/'>Go back</a>");
        }
        return;
    }

    // Default: show form page for GET /
    if (req.method === "GET" && req.url === "/") {
        res.end(renderFormPage());
        return;
    }

    // Handle other routes or methods
    res.statusCode = 404;
    res.end("<h1>404 Not Found</h1>");
});

server.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
server.on("error", (err) => {
    console.error("Server error:", err);
});
