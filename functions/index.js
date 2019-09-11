const functions = require('firebase-functions');


 exports.addProject = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
 });

 exports.addUser = functions.https.onRequest((request, response) => {

    if (!req.body.email || !req.body.name || !req.body.password || !req.body.companyId  || req.body.role || req.body.projectId) {
        res.status(422).send({ error: true, message: "Missing Something" })
    
    }
    else {
        const user = req.body

        admin.auth().createUser({
            email: user.email,
            emailVerified: false,
            phoneNumber: user.phoneNumber,
            password: user.password,
            displayName: user.username,
        })
            .then((userReord ) => {
                console.log(`User record`)
                console.log(JSON.stringify(userReord))
                admin.auth().setCustomUserClaims(userReord.uid, { admin: user.role, projectId: user.projectId })
                    .then(() => res.status(200).send({
                        message: `Successfuly created ${user.email}`
                    })
                    )
                    .catch(error => res.status(500).send({
                        error: error,
                        message: "Issue Setting up custom Claims"
                    }))

            })
            .catch(
                (error ) => res.status(500).send({
                    error: error,
                    message: "Issue creating user Kindly try Again"
                })
)



    }



   });
