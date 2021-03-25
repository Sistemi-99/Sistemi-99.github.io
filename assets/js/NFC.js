var condition = false;
async function scanNFC() {
  var lista = [];
  var text = "";
  const ndef = new NDEFReader();
  try {
    // const ndef = new NDEFReader();
    await ndef.scan();
    lista = [];
    lista.push("> Scan started");
    condition = true;

    ndef.onreadingerror = () => {
      lista.push("Argh! Cannot read data from the NFC tag. Try another one?");
      text = "";
      for (i = 0; i < lista.length; i++) {
        text += `${lista[i]} <br>`;
      }
      document.getElementById("listLog").innerHTML = text;
    };

    ndef.onreading = (event) => {
      lista.push(`> Serial Number: ${event.serialNumber}`);
      const decoder = new TextDecoder();
      for (let index = 0; index < event.message.records.length; index++) {
        const record = event.message.records[index];
        lista.push(`encoding: ${record.encoding}`);
        lista.push(`lang: ${record.lang}`);
        lista.push(`Record type: ${record.recordType}`);
        lista.push(`MIME type: ${record.mediaType}`);
        lista.push(`Record id: ${record.id === "" ? null : record.id}`);
        //lista.push(`---data---: ${decoder.decode(record.data)}`);
      }
      text = "";
      for (i = 0; i < lista.length; i++) {
        text += `${lista[i]} <br>`;
      }
      document.getElementById("listLog").innerHTML = text;
    };
    text = "";
    for (i = 0; i < lista.length; i++) {
      text += `${lista[i]} <br>`;
    }
    document.getElementById("listLog").innerHTML = text;
  } catch (error) {
    lista = [];
    condition = false;
    text = "";
    lista.push("Arghhhhhh! " + error);
    for (i = 0; i < lista.length; i++) {
      text += `${lista[i]} <br>`;
    }
    document.getElementById("listLog").innerHTML = text;
  }
}
