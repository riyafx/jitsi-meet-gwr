const AWS = require("aws-sdk");
const ID = "AKIAWT4FA7FQXBUEQJ3Y";
const SECRET = "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";

// The name of the bucket that you have created
const BUCKET_NAME = "gwr-recording";
AWS.config.update({ region: "ap-south-1" });

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
    apiVersion: "2006-03-01",
});

const params = {
    Bucket: BUCKET_NAME,
    CreateBucketConfiguration: {
        // Set your region here
        LocationConstraint: "ap-south-1",
    },
};

export const uploadFile = (fileName, Data) => {
    // Read content from the file
    const fileContent = Data;
    let currentUTCTime = new Date();
    let recordingUTCTime = new Date();
    recordingUTCTime.setSeconds(recordingUTCTime.getSeconds() - 15);
    let metadata = {
        author: "gwr",
        time_format: "UTC",
        video_uploaded: currentUTCTime.toISOString(),
        recording_started: recordingUTCTime.toISOString(),
    };
    // Setting up S3 upload parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName, // File name you want to save as in S3
        Body: fileContent,
        Metadata: metadata,
    };

    // Uploading files to the bucket
    s3.upload(params, function (err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};
