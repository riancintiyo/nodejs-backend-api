function renderFormPage() {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>My First Page</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          background-color: #f4f4f4;
        }
        h1 {
          color: #333;
        }
        p {
          font-size: 18px;
          line-height: 1.6;
          color: #666;
        }
      </style>
    </head>
    <body>
      <h1>Welcome to My First Page</h1>
      <p>This is a simple HTML page served by a Node.js HTTP server.</p>
  <form method="POST" action="/submitted">
        <label for="dropdown">Choose an option:</label>
        <select id="dropdown" name="dropdown">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
        <br><br>
        <fieldset>
          <legend>Select your interests:</legend>
          <label><input type="checkbox" name="interests" value="coding"> Coding</label>
          <label><input type="checkbox" name="interests" value="music"> Music</label>
          <label><input type="checkbox" name="interests" value="sports"> Sports</label>
        </fieldset>
        <br>
        <label for="comments">Your comments:</label>
        <br>
        <textarea id="comments" name="comments" rows="4" cols="40"></textarea>
        <br><br>
        <button type="submit">Submit</button>
      </form>

      <h2>Create txt file</h2>
      <form method="POST" action="/message">
        <label for="message">Enter your message:</label>
        <br>
        <textarea id="message" name="message" rows="4" cols="40"></textarea>
        <br><br>
        <button type="submit">Submit</button>
      </form>
    </body>
    </html>
  `;
}

function renderSubmittedPage(params, rawBody) {
    let formatted = "<ul>";
    for (const [key, value] of params.entries()) {
        if (key === "interests") {
            const interests = params.getAll("interests");
            formatted += `<li><strong>${key}:</strong> ${interests.join(", ")}</li>`;
            continue;
        }
        formatted += `<li><strong>${key}:</strong> ${value}</li>`;
    }
    formatted += "</ul>";
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Form Submitted</title>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
        h1 { color: #333; }
        p { font-size: 18px; color: #666; }
      </style>
    </head>
    <body>
      <h1>Thank you!</h1>
      <p>Your form has been submitted.</p>
      <h2>Submitted Data:</h2>
      ${formatted}
      <a href="/">Go back</a>
    </body>
    </html>
  `;
}

module.exports = {
    renderFormPage,
    renderSubmittedPage,
};
