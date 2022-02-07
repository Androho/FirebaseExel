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

const firebaseConfig = {

};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

const jsonToFirestore = async () => {
    try {
        await db.collection("data").doc("one").set(upload).then(() => {
            document.getElementById("jsondata").innerHTML = "<span>Document successfully written!</span>"
        });
    } catch (err) {
        document.getElementById("jsondata").innerHTML = "<span class='error' style='color: red;'>" + err.name + " : " + err.message + "</span>"
    }
};

