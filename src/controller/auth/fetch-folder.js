// module.exports = function makeUserFolders({ client, google, createFolder }) {
//   return async function userFolders(userId) {
//     try {
//       console.log("userId", userId);
//       const gmail = google.gmail({ version: "v1", auth: client });
//       const res = await gmail.users.labels.list({
//         userId: "me",
//       });
//       const labels = res.data.labels;
//       console.log("LABELS::::::::::", labels);
//       for (let i = 0; i < labels.length; i++) {
//         const label = labels[i];
//         console.log(`- ${label.name} (${label.id})`);
//         const res = await createFolder({
//           databaseName: "email_client_cockroach1",
//           folderName: label.name,
//           providerId: label.id,
//           userId,
//         });
//         console.log(res);
//       }
//     } catch (error) {
//       console.error(error);
//       // res.status(400).send("server error");
//     }
//   };
// };
