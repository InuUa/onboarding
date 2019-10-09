const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp();

const db = admin.firestore()


exports.addProject = functions.https.onRequest((request, response) => {
    response.send("Construction in Progress");
});

exports.addUser = functions.https.onRequest((req, res) => {

    if (!req.body.email || !req.body.name || !req.body.password || !req.body.role || !req.body.projectId) {
        console.log(JSON.stringify(req.body))
        res.status(422).send({ error: true, message: "Missing Something" })

    }
    else {
        const user = req.body

        return admin.auth().createUser({
            email: user.email,
            emailVerified: false,
            phoneNumber: user.phoneNumber,
            password: user.password,
            displayName: user.username,
        }).then(
            function (userReord) {
                console.log(userReord)
            }
        ).catch(
            function (error) {
                console.log(error)
            }
        )


        /*.then((userReord) => {
            console.log(`User record`)
            console.log(JSON.stringify(userReord))
            return admin.auth().setCustomUserClaims(userReord.uid, { admin: user.role, projectId: user.projectId })



        })
            .then(() => res.status(200).send({
                message: `Successfuly created ${user.email}`
            })
            )
            .catch(
                (error) => res.status(500).send({
                    error: error,
                    message: "Issue creating user Kindly try Again"
                })
            )*/

    }



});


exports.ReceiveProduct = functions.https.onRequest((req, res) => {

    if (!req.body.Name || !req.body.Amount) {
        res.status(422).json({ "error": " Missing information Select amount or product" })
    }
    else {

        const Materials = db.collection(`Sites/xxx/Stock`)

        const Material = Materials.filter



        let transaction = db.runTransaction(t => {

            let stockRef = db.collection(`Sites/ddd/Stock/`);
            let Stock = stockRef.where("", "==", "")
                .get()
                .then(snapshot => {
                    if (snapshot.empty) {
                        console.log('No matching documents.');
                        return;
                    }
                    snapshot.forEach(doc => {
                        console.log(doc.id, '=>', doc.data());
                    });
                }

                ).then(item => {
                    //Update the Stock
                    let increment = admin.firestore.FieldValue.increment(req.body.Amount)
                    let itemRef = db.collection(`Sites/ddd/Stock`).doc(item.id);
                    itemRef.update({ "Amount": increment })
                })
        })
            .then(result => res.status(200).send({ "error": false, "message": " transaction success" }))
            .catch(e => res.status(400).send({ "error": true, "message": e.message }))


    }
})


exports.DisburseProduct = functions.https.onRequest((req, res) => {

    if (!req.body.Name || !req.body.Amount) {
        res.status(422).json({ "error": " Missing information Select amount or product" })
    }
    else {

        const Materials = db.collection(`Sites/xxx/Stock`)

        const Material = Materials.filter




        let transaction = db.runTransaction(t => {

            let stockRef = db.collection(`Sites/ddd/Stock/`);
            let Stock = stockRef.where("", "==", "")
                .get()
                .then(snapshot => {
                    if (snapshot.empty) {
                        console.log('No matching documents.');
                        return;
                    }
                    snapshot.forEach(doc => {
                        console.log(doc.id, '=>', doc.data());
                    });
                }

                ).then(item => {
                    //Update the Stock
                    let increment = admin.firestore.FieldValue.increment(-req.body.Amount)
                    let itemRef = db.collection(`Sites/ddd/Stock`).doc(item.id);
                    itemRef.update({ "Amount": increment })
                })
        })
            .then(result => res.status(200).send({ "error": false, "message": " transaction success" }))
            .catch(e => res.status(400).send({ "error": true, "message": e.message }))

    }
})