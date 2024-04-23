const { OAuth2Client } = require("google-auth-library");
const cockroachDb = require("../data-access").cockroach;

const CLIENT_ID = "";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost:5000/auth/google/callback";

const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

async function renewAccessToken() {
  const databaseName = "email_client_cockroach1";
  const minuteInEpochTime = 60000;
  const soonToExpireTime = +new Date() + 30 * minuteInEpochTime;
  const result = await cockroachDb.usersDb.getExpiringSoonUsersRefreshToken({
    databaseName,
    soonToExpireTime,
  });
  console.log("Fetchedd users and tokens:", result);
  result.forEach((user) => {
    client.setCredentials({ refresh_token: user.refresh_token });
    client
      .getAccessToken()
      .then(async (tokenResponse) => {
        const accessToken = tokenResponse.token;
        console.log("NEW ACCESS TOKEN: ", accessToken);
        await cockroachDb.usersDb.updateAccessToken({
          accessToken,
          databaseName,
          userId: user.user_id,
        });
      })
      .catch((err) => {
        console.log("ERRORR CREATING ACCESS TOKEN:: ", err);
      });
  });
}
renewAccessToken();
