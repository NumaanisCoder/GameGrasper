import ImageKit from "imagekit";

var imagekita = new ImageKit({
  publicKey: "public_VM6jVFCdnlJ7ytsTFFW6of+cmcE=",
  privateKey: "private_lgmlpz2BXLEViZ6HT7Bi46yvmOk=",
  urlEndpoint: "https://ik.imagekit.io/xnrxbagp7",
});

const uploadImage = async (imageBuffer, imageName) =>{
    imageBuffer = imageBuffer.toString('base64');
    let urlData = undefined;
    // let data = undefined;[]
    await imagekita.upload({
        file: imageBuffer,
        fileName: imageName 
    }).then((res)=>{
        urlData = res.url;
    }).catch(err=>{
        console.log(err);
    })
    return urlData;
}

export default uploadImage; 