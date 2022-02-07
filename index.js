// upload and convert
let selectedFile;
let upload;
// console.log(window.XLSX);
document.getElementById('input').addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
})
let data = [{
    "name": "jayanth",
    "data": "scd",
    "abc": "sdef"
}]
document.getElementById('button').addEventListener("click", () => {
    XLSX.utils.json_to_sheet(data, 'out.xlsx');
    if (selectedFile) {
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        var temp=[];
        fileReader.onload = (event) => {
            let data = event.target.result;
            let workbook = XLSX.read(data, {type: "binary"});
            // console.log(workbook);
            workbook.SheetNames.forEach(sheet => {
                let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                temp.push(rowObject);
                upload = Object.assign({}, temp);
                document.getElementById("jsondata").innerHTML = "<button type='button' onclick='jsonToFirestore()' >Upload to Firebase</button><br>"+JSON.stringify(upload);
            });
        }
    }
})
// sending firebase
// const serviceAccount = {
//     "type": "service_account",
//     "project_id": "exeltojson",
//     "private_key_id": "553a761a87ad4561bd37320583f98320dceed59f",
//     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC5al2Rw3pSDC4P\nZ27q0RUIallMIdRsoU/Npl+YT6vbyqkzQJoL87qiW9rY6f3JvWkO1y/1i1kmDD07\no9lMaABGggPAwZ89k+EI8vXKGLmDaIokUPem6PlBkaAYGMhtpFJ31rLYQy7eum3d\nFHYElekqsBzTpcy7Jd2bVpRvO+bYpAeUMrQKY7ekaz/CdNDL7+Koh3cr9K7Tlf19\nSePIYz+lj76EIg6BbzTlyd6lN7BlVAAhEslzdlvXBXD7d2bak3+UWwMyRDMdONji\nK8dUHCpkiH6TdsBfBVzVKc2qpk9uHGONENBJby7WOGfFGcI6Skjmv9TvgYFrqLxf\n8p76fwLlAgMBAAECggEACH+FR93FgLaxsr+LICSSmfbj3l8rkQoIshSGy6CVMCb2\n/9Qda2BRpMjgfDInUWSGyOkYd+DZ5mpHsTDWkA+xOYoSeXZ2YbhiJ0qZdNiSwiDb\nugPjAemqKPTveUNDhnDyXa8/tbVIk+lICUq7iQTE8dGuFI5EFqzK3iiG950vfKzd\n418beRAcAOLAl8k5q6Rxd/zcN8XRyfmGRfX0Y6AgFbMk8nk3JFI+4f/84ZBvTHXg\nvxQxTwNZnOm8se/Toy2VBdfYex4KpqCS1Pvt4BrTRgKTB9JImbPvp4uZ0SRaP4eq\ndwg7lx1C+DDgm02Hsj/LQBH3yN4JGVEj2cYfsrwqUQKBgQDvjRjOlTfl/gAk0ZAO\nZtVxWK4L5UxB41FkPDxX/PBADhN9qI/Rju7b3HcCHGLJ2LUBOqkxCSTB8FUYmzn2\n9jz1K7zbvkVVH/dTMFd5fdWDO5fR2bbIkxz7Ids773ToFw5ASJvQSE2OdhLwNAKj\nKdQPwoWcU8ja5JTlT83PJtyzcQKBgQDGJafFA69Gj3MDCBc9Fxb7QeL9UnVpe6wb\nVTCLYhCmarNRksuFnw13StTdIGxWx9ax8aV0mj7MROCTCi4s1t/zphlM70unqgNJ\n8hxVKeM/DFEgbgqtCE8ifCoq+DjkRXEhDlI3kGOQRZGSvR6fEoz6k0fZNf9Dhynm\nSIt4ShxktQKBgQDLuQwqy/5A63XF2i8QAGZvQcKqvTPQKPlULGIJVkQfxZjP2eWN\ni2gZtPHE6s0c6d5tkCzJVgRbpv9HsONn4tvOiYbQvo0KKuhUaB1MZjaJp8minuvy\nwiH4dT+URj3/D3SAOP/B72t9x26ttx2zE2SUjpLAcwSzG4iBSBA4ps01EQKBgQCg\nWeDHQxAZHgWJMob73S+v7cXwE0cJMhg5lltOsPGge0Daht1FKU4Qd/KDcLW8FMTe\nBBxNnHWtgR/sXpS3nLxnxMc8x3qGGMPIl7HuCZPpdeJBSExDczH3SlwlofMIaFoA\n0kIezS6FlocUJRAe0zhbn8zJLzWARGXYAmU7113a8QKBgQCmk7YPHu02BYUX3oxq\nh2oj8hpu4UeWF2SwCF2uRW2CNRMWi+dT18pqWmD4Gbae72Ox/l6D7ntViCxmoBGP\n01b6PkQS6mfUi5IswhEdiN42M12HKm7zQZ4hLSb6cGuLM7wbQp3ZJm2Ir0nhYfpQ\nlbLwIE876gsR1GVuWfd7EHhvyA==\n-----END PRIVATE KEY-----\n",
//     "client_email": "firebase-adminsdk-t9x9y@exeltojson.iam.gserviceaccount.com",
//     "client_id": "103497874458509177378",
//     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//     "token_uri": "https://oauth2.googleapis.com/token",
//     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-t9x9y%40exeltojson.iam.gserviceaccount.com"
// }
const firebaseConfig = {
    apiKey: "AIzaSyABvXiwNuhp6XJBxNh8iRa5jl6FrZSvsiM",
    authDomain: "exeltojson.firebaseapp.com",
    projectId: "exeltojson",
    storageBucket: "exeltojson.appspot.com",
    messagingSenderId: "38202369748",
    appId: "1:38202369748:web:f3e1f6ae166df61e72fd41",
    databaseURL: "https://exeltojson.firebaseio.com/"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

const jsonToFirestore = async () => {
    try {
        await db.collection("data").doc("one").set(upload).then(() => {
            document.getElementById("jsondata").innerHTML = "<span>Document successfully written!</span>"
        });
    } catch (err) {
        document.getElementById("jsondata").innerHTML = "<span>" + err.name + " : " + err.message + "</span>"
    }
};

